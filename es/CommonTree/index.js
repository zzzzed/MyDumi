import 'antd/es/tree/style';
import _Tree from 'antd/es/tree';

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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

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

import React, { useState, useEffect } from 'react';
export default function CommonTree(props) {
  var gData = props.gData,
    checkable = props.checkable,
    draggable = props.draggable,
    content = props.content,
    height = props.height,
    checkedKeys = props.checkedKeys,
    onTreeSelect = props.onTreeSelect,
    checkTreeNode = props.checkTreeNode,
    onTreeDropEnd = props.onTreeDropEnd,
    style = props.style,
    hasExpandedKeys = props.hasExpandedKeys;

  var _useState = useState(gData),
    _useState2 = _slicedToArray(_useState, 2),
    newgData = _useState2[0],
    setNewgData = _useState2[1];

  var _useState3 = useState(gData),
    _useState4 = _slicedToArray(_useState3, 2),
    newCheckedKeys = _useState4[0],
    setNewCheckedKeys = _useState4[1];

  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    Iprops = _useState6[0],
    setIProps = _useState6[1];

  useEffect(function() {
    if (checkable)
      setIProps(
        _objectSpread(
          _objectSpread({}, Iprops),
          {},
          {
            newCheckedKeys: newCheckedKeys,
          },
        ),
      );
  }, []);
  useEffect(
    function() {
      setNewgData(gData);
      setNewCheckedKeys(checkedKeys);

      if (hasExpandedKeys) {
        setIProps(
          _objectSpread(_objectSpread({}, Iprops), {
            expandedKeys: handleExpandedKeys(gData, []),
          }),
        );
      }
    },
    [gData, checkedKeys],
  );

  var onSelect = function onSelect(selectedKeys, info) {
    if (onTreeSelect) {
      onTreeSelect(selectedKeys, info);
    }
  };

  var onCheck = function onCheck(checkedKeys, info) {
    if (checkTreeNode) {
      checkTreeNode(checkedKeys, info);
    }
  };

  var dropEnd = function dropEnd() {};

  var onDrop = function onDrop(info) {
    var dropKey = info.node.key;
    var dragKey = info.dragNode.key;
    var dropPos = info.node.pos.split('-');
    var dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    var loop = function loop(data, key, callback) {
      data.forEach(function(item, index, arr) {
        if (item.key === key) {
          return callback(item, index, arr);
        }

        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    var data = _toConsumableArray(newgData);

    var dragObj;
    loop(data, dragKey, function(item, index, arr) {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, function(item) {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      loop(data, dropKey, function(item) {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      var ar = [];
      var i = 0;
      loop(data, dropKey, function(item, index, arr) {
        ar = arr;
        i = index;
      });

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setNewgData(data);

    if (onTreeDropEnd) {
      onTreeDropEnd(data);
    }
  };

  var handleExpandedKeys = function handleExpandedKeys(data, arr) {
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].key);

      if (data[i].children) {
        handleExpandedKeys(data[i].children, arr);
      }
    }

    return arr;
  };

  var onExpand = function onExpand(expandedKeys) {
    if (props.hasExpandedKeys) {
      setIProps(
        _objectSpread(
          _objectSpread({}, Iprops),
          {},
          {
            expandedKeys: expandedKeys,
          },
        ),
      );
    }
  };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'DialogMenuManagerLeft',
      style: style,
    },
    content,
    /*#__PURE__*/ React.createElement(
      _Tree,
      _extends(
        {
          checkable: checkable || false,
          draggable: draggable || false,
          blockNode: true,
          onSelect: onSelect,
          onCheck: onCheck,
          treeData: newgData,
          onDragEnd: dropEnd,
          onDrop: onDrop,
          onExpand: onExpand,
          height: height,
        },
        Iprops,
      ),
    ),
  );
}
