import React, { useState } from 'react';
import { Button } from 'antd';
import { SlotMachine } from '../src';

export default () => {
  const [num, setNum] = useState<number[]>([6, 7, 0]);

  const begin = () => {
    setTimeout(() => {
      setNum([6, 6, 6]);
    }, 2000);
  };

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        {num.map((item, index) => (
          <SlotMachine key={index} style={style} i={item} delay={index + 2.5} />
        ))}
      </div>
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
