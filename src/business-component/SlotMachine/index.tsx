import React, { CSSProperties, useRef } from 'react';
import './index.less';

interface IProps {
  style: React.CSSProperties;
  delay?: number;
  i: number;
  status: 'begin' | 'end';
  blurNum?: number;
}

const SlotMachine = (props: IProps) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const { style, delay, i, status, blurNum } = props;

  const mergeStyle = ({
    ...style,
    '--width': style.width,
    '--height': style.height,
    '--i': i,
    '--delay': delay,
  } as unknown) as CSSProperties;

  return (
    <div
      style={{
        ...mergeStyle,
        animation:
          status === 'begin'
            ? `enhance-bounce-in-down 1s ${delay}s forwards`
            : '',
      }}
      className="scroll-num"
    >
      <ul
        style={{
          animation:
            status === 'begin'
              ? `move 0.3s linear infinite, bounce-in-down 1s ${delay}s forwards`
              : '',
        }}
      >
        {arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <svg width="0" height="0">
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation={`0 ${blurNum}`} />
        </filter>
      </svg>
    </div>
  );
};

SlotMachine.defaultProps = {
  blurNum: 2,
  delay: 2,
};

export default SlotMachine;
