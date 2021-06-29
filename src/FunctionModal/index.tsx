import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  WrapperModal: any;
  config: {
    mountId?: string;
  };
}

export default (props: IProps) => {
  const { WrapperModal } = props;

  const div = document.createElement('div');

  return new Promise((resolve, reject) => {
    ReactDOM.render(<WrapperModal />, div);
  });
};
