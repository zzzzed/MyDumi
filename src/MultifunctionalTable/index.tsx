import React from 'react';
import { Table, Form } from 'antd';
import './index.less';
import { Item, GroupItem, IMultifunctionalTableProps } from './type';
import EditableCell from './components/editableCell';

const MultifunctionalTable = (props: IMultifunctionalTableProps) => {
  const { columns, sourceData, GroupTitle, form, editingKey } = props;

  /**
   * 处理columns
   */
  const mergedColumns = columns.map((col, index) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      render: (text: string, record: Item) => {
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
      onCell: (record: Item) => ({
        record,
        $type: col.$type,
        col,
        dataIndex: col.dataIndex,
        id: record.id,
        title: col.title,
        editing: editingKey === record.parentId,
        rules: col.rules ?? null,
      }),
    };
  });

  /**
   * 处理checkbox
   */
  const rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.parentId,
      className: record.parentId ? 'hidden_checkbox' : '',
    }),
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowSelection={{
          ...rowSelection,
          type: 'checkbox',
          checkStrictly: false,
        }}
        columns={mergedColumns}
        expandable={{
          rowExpandable: record => !record?.parentId,
          defaultExpandAllRows: true,
          expandIconColumnIndex: -1,
        }}
        rowKey={record => record.id}
        dataSource={sourceData}
      ></Table>
    </Form>
  );
};

export default MultifunctionalTable;
