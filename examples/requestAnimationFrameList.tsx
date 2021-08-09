import React, { useEffect } from 'react';
import animationFunc from '../src/utils/RequestAnimationFrameList';

const RequestAnimationFrameList = () => {
  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('container')) {
        animationFunc(document.getElementById('container'), 10000, 20);
      }
    }, 500);
  }, []);

  return <ul id="container" style={{ height: 200, overflow: 'scroll' }}></ul>;
};

export default RequestAnimationFrameList;
