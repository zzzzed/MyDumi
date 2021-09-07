function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

import React from 'react';
import ReactDOM from 'react-dom';
export default (function(props) {
  var WrapperModal = props.WrapperModal,
    mountId = props.config.mountId; // 动态创建挂载节点

  var div = document.createElement('div');
  div.id = mountId || 'function-modal-wrapper';
  document.body.appendChild(div);

  var destory = function destory() {
    // unmountComponentAtNode从DOM中卸载组件，返回boolean
    var ummountResult = ReactDOM.unmountComponentAtNode(div);

    if (ummountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  return new Promise(function(resolve, reject) {
    ReactDOM.render(
      /*#__PURE__*/ React.createElement(
        WrapperModal,
        _extends({}, props, {
          destory: destory,
          resolve: resolve,
          reject: reject,
        }),
      ),
      div,
    );
  });
});
