import React, { useState } from 'react';
import VirtualListProRender from '../src/utils/VirtualListPro';
import { lorem } from 'faker';

export default () => {
  let listData = [];
  for (let i = 0; i < 100; i++) {
    listData.push({
      id: i,
      value: lorem.sentences(),
    });
  }
  return (
    <>
      <VirtualListProRender
        listData={listData}
        screenHeight={500}
        estimatedItemSize={50}
        bufferScale={1}
        height={500}
      />
    </>
  );
};
