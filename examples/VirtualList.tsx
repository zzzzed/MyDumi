import React, { useState } from 'react';
import VirtualListRender from '../src/utils/VirtualList';

export default () => {
  let listData = [];
  for (let i = 0; i < 1000; i++) {
    listData.push({ id: i, value: i });
  }
  return (
    <>
      <VirtualListRender listData={listData} screenHeight={500} />
    </>
  );
};
