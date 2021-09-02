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

import React, { useEffect, useState, useMemo, useRef } from 'react';
import './VirtualList.less';
import { cloneDeep } from 'lodash-es';
/**
 * 虚拟列表-动态高度
 * 核心：初始时先预估高度，待一部分元素渲染完成再获取真实高度
 */

var VirtualListPro = function VirtualListPro(props) {
  var listData = props.listData,
    estimatedItemSize = props.estimatedItemSize,
    bufferScale = props.bufferScale,
    screenHeight = props.screenHeight;

  var _useState = useState({
      startIndex: 0,
      endIndex: 0,
    }),
    _useState2 = _slicedToArray(_useState, 2),
    computedData = _useState2[0],
    setComputedData = _useState2[1];

  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    positions = _useState4[0],
    setPositions = _useState4[1]; // 对元数据进行处理，加上height，top，bottom等参数

  var _useState5 = useState(props.height),
    _useState6 = _slicedToArray(_useState5, 2),
    height = _useState6[0],
    setHeight = _useState6[1]; // 列表总高度

  var itemsRef = useRef(null);
  var listRef = useRef(null);
  useEffect(function() {
    setComputedData({
      startIndex: 0,
      endIndex: visibleCount,
    });
    initialPositions();
  }, []);
  useEffect(
    function() {
      var _itemsRef$current, _itemsRef$current2;

      //@ts-ignore
      if (
        !((_itemsRef$current = itemsRef.current) === null ||
        _itemsRef$current === void 0
          ? void 0
          : _itemsRef$current.children) &&
        !((_itemsRef$current2 = itemsRef.current) === null ||
        _itemsRef$current2 === void 0
          ? void 0
          : _itemsRef$current2.children.length)
      )
        return;

      if (positions && positions.length) {
        // 元素已经渲染，获取元素真实大小，修改对应的尺寸缓存
        updateItemsSize();
      }
    },
    [computedData],
  );
  useEffect(
    function() {
      var _positions;

      // 更新列表总高度
      setHeight(
        (_positions = positions[positions.length - 1]) === null ||
          _positions === void 0
          ? void 0
          : _positions.bottom,
      );
    },
    [positions],
  );
  /**
   * 初始设置每个元素的坐标值
   */

  var initialPositions = function initialPositions() {
    var res = listData.map(function(_, index) {
      return {
        index: index,
        height: estimatedItemSize,
        top: index * estimatedItemSize,
        bottom: (index + 1) * estimatedItemSize,
      };
    });
    setPositions(res);
  };
  /**
   * 可视区域元素数量
   * @returns number
   */

  var visibleCount = useMemo(
    function() {
      return Math.ceil(screenHeight / estimatedItemSize);
    },
    [screenHeight, estimatedItemSize],
  );
  /**
   * 可视区上方元素数量
   */

  var aboveCount = useMemo(
    function() {
      return Math.min(computedData.startIndex, bufferScale * visibleCount);
    },
    [computedData, bufferScale, visibleCount],
  );
  /**
   * 可视区下方元素数量
   */

  var belowCount = useMemo(
    function() {
      return Math.min(
        listData.length - computedData.endIndex,
        bufferScale * visibleCount,
      );
    },
    [listData, computedData.startIndex, bufferScale, visibleCount],
  );
  /**
   * 可视区域数据
   */

  var visibleData = useMemo(
    function() {
      var start = computedData.startIndex - aboveCount;
      var end = computedData.endIndex + belowCount;
      return listData.slice(start, end);
    },
    [computedData.startIndex, computedData.endIndex],
  ); //获取列表起始索引

  var getStartIndex = function getStartIndex() {
    var scrollTop =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    //二分法查找
    return binarySearch(positions, scrollTop);
  };
  /**
   * 二分查找，查找起始的index
   * @param list
   * @param value
   */

  var binarySearch = function binarySearch(list, value) {
    var _tempIndex;

    var start = 0;
    var end = list.length - 1;
    var tempIndex = null;

    while (start <= end) {
      var _list$midIndex;

      var midIndex = (start + end) >> 1;
      var midValue =
        (_list$midIndex = list[midIndex]) === null || _list$midIndex === void 0
          ? void 0
          : _list$midIndex.bottom;

      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex;
        }

        end--;
      }
    }

    return (_tempIndex = tempIndex) !== null && _tempIndex !== void 0
      ? _tempIndex
      : 0;
  };
  /**
   * 获取列表项的当前尺寸
   */

  var updateItemsSize = function updateItemsSize() {
    var _itemsRef$current3;

    // @ts-ignore
    var nodes =
      (_itemsRef$current3 = itemsRef.current) === null ||
      _itemsRef$current3 === void 0
        ? void 0
        : _itemsRef$current3.children;
    nodes.forEach(function(node) {
      var _positions$index;

      // 获取每个列表项元素的大小和相对于视口的位置
      var rect = node.getBoundingClientRect();
      var height = rect.height;
      var index = +node.id;
      var oldHeight =
        (_positions$index = positions[index]) === null ||
        _positions$index === void 0
          ? void 0
          : _positions$index.height;
      var dValue = oldHeight - height; // 如果实际高度与预估高度存在差异

      if (dValue) {
        debugger;
        var cloneData = cloneDeep(positions);
        cloneData[index].bottom = cloneData[index].bottom - dValue;
        cloneData[index].height = height;

        for (var k = index + 1; k < cloneData.length; k++) {
          cloneData[k].top = cloneData[k - 1].bottom;
          cloneData[k].bottom = cloneData[k].bottom - dValue;
        }

        setPositions(cloneData);
      }
    });
  };
  /**
   * 设置偏移量
   */

  var setStartOffset = useMemo(
    function() {
      var startOffset;

      if (computedData.startIndex >= 1) {
        var _positions2;

        var size =
          positions[computedData.startIndex].top -
          (((_positions2 = positions[computedData.startIndex - aboveCount]) ===
            null || _positions2 === void 0
            ? void 0
            : _positions2.top) || 0);
        startOffset = positions[computedData.startIndex - 1].bottom - size;
      } else {
        startOffset = 0;
      }

      return 'translate3d(0,'.concat(startOffset, 'px,0)');
    },
    [positions, aboveCount, computedData],
  );

  var scrollEvent = function scrollEvent() {
    var _listRef$current;

    //当前滚动位置
    //@ts-ignore
    var scrollTop =
      (_listRef$current = listRef.current) === null ||
      _listRef$current === void 0
        ? void 0
        : _listRef$current.scrollTop; //此时的开始索引
    //此时的结束索引

    setComputedData({
      startIndex: getStartIndex(scrollTop),
      endIndex: getStartIndex(scrollTop) + visibleCount,
    }); //此时的偏移量
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      style: {
        height: screenHeight,
      },
      ref: listRef,
      className: 'infinite-list-container',
      onScroll: scrollEvent,
    },
    /*#__PURE__*/ React.createElement('div', {
      className: 'infinite-list-phantom',
      style: {
        height: height,
      },
    }),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        ref: itemsRef,
        className: 'infinite-list',
        style: {
          textAlign: 'left',
          width: '50%',
          transform: setStartOffset,
        },
      },
      visibleData === null || visibleData === void 0
        ? void 0
        : visibleData.map(function(item, index) {
            return /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'infinite-list-item',
                id: ''.concat(item.id),
                key: index,
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  style: {
                    color: 'red',
                  },
                },
                item.id,
              ),
              item.value,
            );
          }),
    ),
  );
};

VirtualListPro.defaultProps = {
  screenHeight: document.body.clientHeight,
  height: '100%',
};
export default VirtualListPro;
