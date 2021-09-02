function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React from 'react';
import './index.less';

var SlotMachine = function SlotMachine(props) {
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  var style = props.style,
    delay = props.delay,
    i = props.i,
    status = props.status,
    blurNum = props.blurNum;

  var mergeStyle = _objectSpread(
    _objectSpread({}, style),
    {},
    {
      '--width': style.width,
      '--height': style.height,
      '--i': i,
      '--delay': delay,
    },
  );

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      style: _objectSpread(
        _objectSpread({}, mergeStyle),
        {},
        {
          animation:
            status === 'begin'
              ? 'enhance-bounce-in-down 1s '.concat(delay, 's forwards')
              : '',
        },
      ),
      className: 'scroll-num',
    },
    /*#__PURE__*/ React.createElement(
      'ul',
      {
        style: {
          animation:
            status === 'begin'
              ? 'move 0.3s linear infinite, bounce-in-down 1s '.concat(
                  delay,
                  's forwards',
                )
              : '',
        },
      },
      arr.map(function(item, index) {
        return /*#__PURE__*/ React.createElement(
          'li',
          {
            key: index,
          },
          item,
        );
      }),
    ),
    /*#__PURE__*/ React.createElement(
      'svg',
      {
        width: '0',
        height: '0',
      },
      /*#__PURE__*/ React.createElement(
        'filter',
        {
          id: 'blur',
        },
        /*#__PURE__*/ React.createElement('feGaussianBlur', {
          in: 'SourceGraphic',
          stdDeviation: '0 '.concat(blurNum),
        }),
      ),
    ),
  );
};

SlotMachine.defaultProps = {
  blurNum: 2,
  delay: 2,
};
export default SlotMachine;
