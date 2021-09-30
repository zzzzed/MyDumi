import { Button } from 'antd';
import React, { useRef, useState } from 'react';

const SuperPrizeGrid = () => {
  const timer1 = useRef();
  const timer2 = useRef();
  const [prizeIdx, setPrizeIdx] = useState<number>(0);
  const [stopIdx, setStopIdx] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const roundArr = [0, 1, 2, 5, 8, 7, 6, 3];

  const move = () => {};

  const lowSpeed = () => {};

  const clickPrize = () => {};

  return <div></div>;
};

export default SuperPrizeGrid;

const data = [
  {
    index: 0,
    seat: 0,
    content: '红包1',
  },
  {
    index: 1,
    seat: 1,
    content: '红包2',
  },
  {
    index: 2,
    seat: 2,
    content: '优惠券1',
  },
  {
    index: 3,
    seat: 7,
    content: '优惠券2',
  },
  {
    index: 4,
    seat: null,
    content: <Button type="primary">开始抽奖</Button>,
  },
  {
    index: 5,
    seat: 3,
    content: '积分1',
  },
  {
    index: 6,
    seat: 6,
    content: '积分2',
  },
  {
    index: 7,
    seat: 5,
    content: '谢谢1',
  },
  {
    index: 8,
    seat: 4,
    content: '谢谢2',
  },
];
