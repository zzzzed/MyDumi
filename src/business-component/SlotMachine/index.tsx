import React, { useRef } from 'react';
import './index.less';

const SlotMachine = (props: any) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="scroll-num">
      123
      <ul>
        {arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <svg width="0" height="0">
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation={`0 ${blur}`} />
        </filter>
      </svg>
    </div>
  );
};

export default SlotMachine;
