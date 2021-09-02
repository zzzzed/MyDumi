import 'antd/es/form/style';
import _Form from 'antd/es/form';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';
import 'antd/es/select/style';
import _Select from 'antd/es/select';
var _excluded = [
  'editing',
  'dataIndex',
  '$type',
  'title',
  'record',
  'index',
  'children',
  'id',
  'rules',
  'col',
];

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

import React from 'react';
var Option = _Select.Option;

var EditableCell = function EditableCell(_ref) {
  var editing = _ref.editing,
    dataIndex = _ref.dataIndex,
    $type = _ref.$type,
    title = _ref.title,
    record = _ref.record,
    index = _ref.index,
    children = _ref.children,
    id = _ref.id,
    rules = _ref.rules,
    col = _ref.col,
    restProps = _objectWithoutProperties(_ref, _excluded);

  var getInputType = function getInputType(record, $type) {
    if ($type === 'component') {
      return col.$component;
    } else if ($type === 'select') {
      /*#__PURE__*/
      React.createElement(
        _Select,
        {
          dropdownClassName: 'fzhs_drop_panel',
        },
        /*#__PURE__*/ React.createElement(
          Option,
          {
            key: 0,
            value: 0,
          },
          '0',
        ),
        /*#__PURE__*/ React.createElement(
          Option,
          {
            key: 1,
            value: 1,
          },
          '1',
        ),
      );
    } else if ($type === 'date') {
      return /*#__PURE__*/ React.createElement(_DatePicker, {
        format: 'YYYY-MM-DD',
        onChange: function onChange() {},
      });
    } else {
      return /*#__PURE__*/ React.createElement(_Input, null);
    }
  };

  var inputNode = getInputType(record, $type);
  return /*#__PURE__*/ React.createElement(
    'td',
    restProps,
    editing
      ? /*#__PURE__*/ React.createElement(
          _Form.Item,
          {
            name: ''.concat(id, '-').concat(dataIndex),
            style: {
              margin: 0,
            },
            rules: rules,
          },
          inputNode,
        )
      : children,
  );
};

export default EditableCell;
