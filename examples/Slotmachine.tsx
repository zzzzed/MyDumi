import React, { useState } from 'react';
import { Button } from 'antd';
import { SlotMachine } from '../src';

export default () => {
  const [num, setNum] = useState<number[]>([6, 7, 0]);
  const [status, setStatus] = useState<'begin' | 'end'>('end');

  const begin = () => {
    setStatus('begin');
    setTimeout(() => {
      let num = (Math.random() * 1000)
        .toFixed(0)
        .toString()
        .split('')
        .map(Number);
      setNum(num);
    }, 2000);
  };

  const reset = () => {
    setStatus('end');
  };

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        {num.map((item, index) => (
          <SlotMachine
            key={index}
            style={style}
            i={item}
            delay={index + 2.5}
            status={status}
          />
        ))}
      </div>
      <Button onClick={reset}>重置</Button>
      <Button type="primary" onClick={begin}>
        开始
      </Button>
    </>
  );
};

const style = {
  width: 26,
  marginRight: 6,
  border: '1px solid black',
  borderRadius: 8,
};
