import { useReducer, useRef } from 'react';
import useCreation from '@/hooks/useCreation';

// 原对象：代理过对象
const proxyMap = new WeakMap();
// 代理过对象：原对象
const rawMap = new WeakMap();

function isObjet(val: object): boolean {
  return typeof val === 'object' && val !== null;
}

function observe<T extends object>(initialVal: T, cb: () => void): T {
  // 现在代理的对象
  const existingProxy = proxyMap.get(initialVal);

  if (existingProxy) {
    return existingProxy;
  }

  // 对象已被代理过
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isObjet(res) ? observe(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  return proxy;
}

export default function useReactive<S extends object>(initialVal: S): S {
  const [, forceUpdate] = useReducer(n => ++n, 0); // 为什么n++无效，n+1有效,(n++ 先赋值在自加)
  const stateRef = useRef<S>(initialVal);
  const state = useCreation(() => observe(stateRef.current, forceUpdate), []);
  return state;
}
