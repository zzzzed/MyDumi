import { ReactElement } from 'react';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

export interface Item {
  id: string;
  [name: string]: any;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: Item;
  index: number;
  $type: string;
  col: ColumnsProps;
  children: React.ReactNode;
  rules: any[];
}

export interface GroupItem {
  id: string;
  zbId?: string;
  [name: string]: any;
}

export interface IMultifunctionalTableProps {
  sourceData: SourceDataProps[];
  columns: ColumnsProps[];
  GroupTitle: (groupTitle: Item) => ReactElement;
  editingKey: string;
  form: FormInstance<any>;
}

export interface ColumnsProps {
  dataIndex: string;
  name: string;
  [name: string]: any;
}

export interface SourceDataProps {
  id: string;
  children: any[];
  [name: string]: any;
}
