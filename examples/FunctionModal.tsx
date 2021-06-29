import React from 'react';
import { Modal, Button, message } from 'antd';
import FunctionModal from '../src/FunctionModal';

interface IProps {
  destory: () => void;
  resolve: () => void;
  reject: () => void;
}

const ModalComponent = (props: IProps) => {
  const { destory, resolve, reject } = props;

  const onOk = () => {
    message.success('do something onOk');
  };

  const onCancel = () => {
    message.success('do something onCancel');
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
