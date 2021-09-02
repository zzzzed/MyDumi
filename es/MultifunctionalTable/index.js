import 'antd/es/form/style';
import _Form from 'antd/es/form';
import 'antd/es/table/style';
import _Table from 'antd/es/table';

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
import EditableCell from './components/editableCell';

var MultifunctionalTable = function MultifunctionalTable(props) {
  var columns = props.columns,
    sourceData = props.sourceData,
    GroupTitle = props.GroupTitle,
    form = props.form,
    editingKey = props.editingKey;
  /**
   * 处理columns
   */

  var mergedColumns = columns.map(function(col, index) {
    if (!col.editable) {
      return col;
    }

    return _objectSpread(
      _objectSpread({}, col),
      {},
      {
        render: function render(text, record) {
          if (record.id && !record.parentId) {
            if (index === 0) {
              return {
                children: GroupTitle(record),
                props: {
                  colSpan: columns.length,
                },
              };
            }

            return {
              props: {
                colSpan: 0,
              },
            };
          }

          return text;
        },
        onCell: function onCell(record) {
          var _col$rules;

          return {
            record: record,
            $type: col.$type,
            col: col,
            dataIndex: col.dataIndex,
            id: record.id,
            title: col.title,
            editing: editingKey === record.parentId,
            rules:
              (_col$rules = col.rules) !== null && _col$rules !== void 0
                ? _col$rules
                : null,
          };
        },
      },
    );
  });
  /**
   * 处理checkbox
   */

  var rowSelection = {
    onChange: function onChange(selectedRowKeys, selectedRows) {
      console.log(
        'selectedRowKeys: '.concat(selectedRowKeys),
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: function getCheckboxProps(record) {
      return {
        disabled: record.parentId,
        className: record.parentId ? 'hidden_checkbox' : '',
      };
    },
  };
  return /*#__PURE__*/ React.createElement(
    _Form,
    {
      form: form,
      component: false,
    },
    /*#__PURE__*/ React.createElement(_Table, {
      components: {
        body: {
          cell: EditableCell,
        },
      },
      bordered: true,
      rowSelection: _objectSpread(
        _objectSpread({}, rowSelection),
        {},
        {
          type: 'checkbox',
          checkStrictly: false,
        },
      ),
      columns: mergedColumns,
      expandable: {
        rowExpandable: function rowExpandable(record) {
          return !(record === null || record === void 0
            ? void 0
            : record.parentId);
        },
        defaultExpandAllRows: true,
        expandIconColumnIndex: -1,
      },
      rowKey: function rowKey(record) {
        return record.id;
      },
      dataSource: sourceData,
    }),
  );
};

export default MultifunctionalTable;
