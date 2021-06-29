import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  WrapperModal: any;
  config: {
    mountId?: string;
  };
}

export default (props: IProps) => {
  const {
    WrapperModal,
    config: { mountId },
  } = props;

  // 动态创建挂载节点
  const div = document.createElement('div');
  div.id = mountId || 'function-modal-wrapper';
  document.body.appendChild(div);

  const destory = () => {
    // unmountComponentAtNode从DOM中卸载组件，返回boolean
    const ummountResult = ReactDOM.unmountComponentAtNode(div);

    if (ummountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  return new Promise((resolve, reject) => {
    ReactDOM.render(
      <WrapperModal
        {...props}
        destory={destory}
        resolve={resolve}
        reject={reject}
      />,
      div,
    );
  });
};
