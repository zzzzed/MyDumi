function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

import React, { useState, useMemo, useRef, useEffect } from 'react';
import './VirtualList.less';
import { debounce as _debounce } from 'lodash-es';

/**
 * 列表项固定高度
 */
var VirtualListRender = function VirtualListRender(props) {
  var itemSize = props.itemSize,
    listData = props.listData,
    screenHeight = props.screenHeight;
  var listRef = useRef(null);

  var _useState = useState({
      startOffset: 0,
      startIndex: 0,
      endIndex: null,
    }),
    _useState2 = _slicedToArray(_useState, 2),
    computedData = _useState2[0],
    setComputedData = _useState2[1];

  useEffect(function() {
    setComputedData({
      startOffset: 0,
      startIndex: 0,
      endIndex: visibleCount,
    });
  }, []); // 监听滚动事件

  var scrollEvent = _debounce(function() {
    //@ts-ignore
    var scrollTop = listRef.current.scrollTop;
    setComputedData({
      startIndex: Math.floor(scrollTop / itemSize),
      startOffset: scrollTop - (scrollTop % itemSize),
      endIndex: Math.floor(scrollTop / itemSize) + visibleCount,
    });
  }, 10);
  /**
   * 列表总高度
   */

  var listHeight = useMemo(
    function() {
      return listData.length * itemSize;
    },
    [listData, itemSize],
  );
  var visibleCount = useMemo(
    function() {
      return Math.ceil(screenHeight / itemSize);
    },
    [itemSize, screenHeight],
  );
  /**
   * 真实显示列表数据
   */

  var visibleData = useMemo(
    function() {
      if (computedData.endIndex) {
        return listData.slice(computedData.startIndex, computedData.endIndex);
      }
    },
    [computedData.startIndex, computedData.endIndex, listData],
  );
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'infinite-list-container',
      style: {
        height: screenHeight,
      },
      ref: listRef,
      onScroll: scrollEvent,
    },
    /*#__PURE__*/ React.createElement('div', {
      className: 'infinite-list-phantom',
      style: {
        height: listHeight,
      },
    }),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'infinite-list',
        style: {
          transform: 'translate3d(0,'.concat(computedData.startOffset, 'px,0)'),
        },
      },
      visibleData === null || visibleData === void 0
        ? void 0
        : visibleData.map(function(item) {
            return /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'infinite-list-item infinite-list-item-'.concat(
                  item.id,
                ),
                style: {
                  height: itemSize,
                  lineHeight: ''.concat(itemSize - 21, 'px'),
                },
                key: item.id,
              },
              item.value,
            );
          }),
    ),
  );
};

VirtualListRender.defaultProps = {
  itemSize: 50,
  screenHeight: document.body.clientHeight,
};
export default VirtualListRender;
