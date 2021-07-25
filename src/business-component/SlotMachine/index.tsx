import React, { CSSProperties, useRef } from 'react';
import './index.less';

interface IProps {
  style: React.CSSProperties;
  delay?: number;
  i: number;
}

const SlotMachine = (props: IProps) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const { style, delay, i } = props;

  const mergeStyle = ({
    ...style,
    '--i': i,
    '--delay': delay,
  } as unknown) as CSSProperties;

  return (
    <div style={mergeStyle} className="scroll-num">
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
