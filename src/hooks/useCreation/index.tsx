import { useRef } from 'react';

export default function useCreation<T>(factory: () => T, deps: any[]): T {
  const { current } = useRef({
    deps,
    object: undefined as undefined | T,
    initialized: false,
  });

  if (!current.initialized || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.object = factory();
    current.initialized = true;
  }

  return current.object as T;
}

function depsAreSame(oldDeps: any[], deps: any[]): boolean {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (oldDeps[i] !== deps[i]) {
      return false;
    }
  }
  return true;
}
