import React from 'react';
import { Modal, Button } from 'antd';
import FunctionModal from '../src/FunctionModal';

interface IProps {
  destory: () => {};
}

const ModalComponent = (props: IProps) => {
  const { destory } = props;

  const onOk = () => {};

  const onCancel = () => {
    destory();
  };

  return (
    <Modal
      title="函数调用modal"
      visible={true}
      destroyOnClose={true}
      maskClosable={false}
      onOk={onOk}
      onCancel={onCancel}
    >
      函数调用...
    </Modal>
  );
};

export default () => {
  const config = {
    mountId: 'test_id',
  };

  const ModalClick = () => {
    FunctionModal({ WrapperModal: ModalComponent, config });
  };

  return (
    <>
      <Button onClick={ModalClick}>弹出Modal框</Button>
    </>
  );
};
