import React from 'react';
import { Form, Select, Input, DatePicker } from 'antd';
import { EditableCellProps } from '../type';

const { Option } = Select;
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  $type,
  title,
  record,
  index,
  children,
  id,
  rules,
  col,
  ...restProps
}) => {
  const getInputType = (record: any, $type: string) => {
    if ($type === 'component') {
      return col.$component;
    } else if ($type === 'select') {
      <Select dropdownClassName="fzhs_drop_panel">
        <Option key={0} value={0}>
          0
        </Option>
        <Option key={1} value={1}>
          1
        </Option>
      </Select>;
    } else if ($type === 'date') {
      return <DatePicker format="YYYY-MM-DD" onChange={() => {}} />;
    } else {
      return <Input />;
    }
  };
  const inputNode = getInputType(record, $type);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={`${id}-${dataIndex}`}
          style={{ margin: 0 }}
          rules={rules}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
