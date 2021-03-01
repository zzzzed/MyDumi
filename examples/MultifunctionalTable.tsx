import React, { useState, useReducer } from 'react';
import { MultifunctionalTable } from '../src';
import { Button, Form } from 'antd';
import moment from 'moment';
import { Item, GroupItem } from '@/MultifunctionalTable/type';
import { cloneDeep } from 'lodash';

const data = [
  {
    id: '750727069792604160',
    yhzhId: '551317',
    yhzhMc: '桂林银行股份有限公司东环路支行0010',
    kjnd: 2020,
    kjqj: 8,
    sjly: 1,
    djly: '1',
    je: 22,
    pzh: null,
    pzId: null,
    szbz: 1,
    qdrq: '2020-08-31T00:00:00.000+0800',
    dfzhmc: null,
    children: [
      {
        id: '750727069800992768',
        parentId: '750727069792604160',
        ywlxCodes: '741279070620389376',
        ywlxXsz: '收销售款-支付备用金',
        qyId: '499146387942957056',
        ztdm: '499146387963928576',
        jysj: '2020-08-31',
        time: moment('2020-08-31', 'YYYY-MM-DD'),
        kjnd: 2020,
        kjqj: 8,
        yhzhuId: '551317',
        szbz: 1,
        jyhb: 0,
        hl: 1,
        jyje: 22,
        jyjebwb: 22,
        jsfs: null,
        sjly: 1,
        bz: null,
        kjsxId: 'S003001',
        kmDzId: '741279070620389376',
        showText: '收销售款-支付备用金',
        ywsjId: '741279072646238231',
      },
    ],
  },
  {
    id: '750349297026994176',
    yhzhId: '551317',
    yhzhMc: '桂林银行股份有限公司东环路支行0010',
    kjnd: 2020,
    kjqj: 8,
    sjly: 1,
    djly: '1',
    je: 22,
    pzh: null,
    pzId: null,
    szbz: -1,
    qdrq: '2020-08-31T00:00:00.000+0800',
    dfzhmc: null,
    children: [
      {
        id: '750727032408772608',
        parentId: '750349297026994176',
        ywlxCodes: '750349278479867905',
        ywlxXsz: '支付费用-560302 财务费用_利息收入-销售部-凤凤-项目1',
        qyId: '499146387942957056',
        ztdm: '499146387963928576',
        jysj: '2020-08-30',
        time: moment('2020-08-30', 'YYYY-MM-DD'),
        kjnd: 2020,
        kjqj: 8,
        yhzhuId: '551317',
        szbz: -1,
        jyhb: 0,
        hl: 1,
        jyje: 11,
        jyjebwb: 11,
        jsfs: null,
        sjly: 1,
        bz: null,
        kjsxId: 'S003019',
        kmDzId: '750349278479867905',
        showText: '支付费用-560302 财务费用_利息收入-销售部-凤凤-项目1',
        ywsjId: '-1',
      },
      {
        id: '750349297039577088',
        parentId: '750349297026994176',
        ywlxCodes: '750349278479867905',
        ywlxXsz: '支付费用-560302 财务费用_利息收入-销售部-凤凤-项目1',
        qyId: '499146387942957056',
        ztdm: '499146387963928576',
        time: moment('2020-08-30', 'YYYY-MM-DD'),
        jysj: '2020-08-31',
        kjnd: 2020,
        kjqj: 8,
        yhzhuId: '551317',
        szbz: -1,
        jyhb: 0,
        hl: 1,
        jyje: 11,
        jyjebwb: 11,
        jsfs: null,
        sjly: 1,
        bz: null,
        kjsxId: 'S003019',
        kmDzId: '750349278479867905',
        showText: '支付费用-560302 财务费用_利息收入-销售部-凤凤-项目1',
        ywsjId: '741279071811571712',
      },
    ],
  },
];

export default () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>('');
  const [sourceData, setSourceData] = useState(data);

  const columns = [
    {
      dataIndex: 'jysj',
      name: 'jysj',
      title: '日期',
      editable: true,
      $type: 'date',
      realVal: 'time',
      rules: [
        {
          required: true,
          message: '日期必填',
        },
      ],
    },
    {
      dataIndex: 'ywlxXsz',
      name: 'ywlxXsz',
      title: '业务类型',
      editable: true,
      $type: 'component',
      $component: <div></div>,
    },
    {
      dataIndex: 'jyje',
      name: 'jyje',
      title: '本位币金额',
      editable: true,
      $type: 'input',
    },
    {
      dataIndex: 'bz',
      name: 'bz',
      title: '备注',
      editable: true,
      $type: 'input',
    },
    {
      dataIndex: 'cz',
      name: 'cz',
      title: '操作',
      render: (_: any, record: any) => {
        if (record.id && !record.parentId) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <div>
            <Button
              disabled={editingKey !== '' && editingKey !== record.parentId}
              onClick={() => addItem(record)}
            >
              新增
            </Button>
            <Button
              disabled={editingKey !== '' && editingKey !== record.parentId}
              onClick={() => delItem(record)}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  /**
   *
   * @param record 新增数据
   */
  const addItem = (record: any) => {
    const { id } = record;
    let data = cloneDeep(sourceData);
    for (let i = 0; i < data.length; i++) {
      let { children } = data[i];
      for (let k = 0; k < children.length; k++) {
        if (id === children[k].id) {
          data[i].children.push({
            // @ts-ignore
            id: Math.random(),
            parentId: data[i].id,
            isNew: true,
          });
          setSourceData(data);
          editGroup(data[i]);
        }
      }
    }
  };

  const editGroup = (groupTitle: GroupItem) => {
    const { children } = groupTitle;
    for (let i = 0; i < children.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        let key = children[i].id + '-' + columns[j].dataIndex;
        let value =
          children[i][`${columns[j].realVal ?? columns[j].dataIndex}`];
        form.setFieldsValue({ [key]: value });
      }
    }
    setEditingKey(groupTitle.id);
  };

  const delItem = (record: any) => {
    const { id, isNew } = record;
    let data = cloneDeep(sourceData);
    if (isNew) {
      for (let i = 0; i < data.length; i++) {
        let { children } = data[i];
        for (let k = 0; k < children.length; k++) {
          if (id === children[k].id) {
            data[i].children.splice(k, 1);
            break;
          }
        }
      }
      setSourceData(data);
      return;
    }
    return record;
  };

  const delbatch = (groupTitle: GroupItem) => {};

  /**
   * 保存行
   * @param groupItem
   */
  const saveGroup = async (groupTitle: GroupItem) => {
    try {
      const row = (await form.validateFields()) as Item;
      const { children } = groupTitle;
      setEditingKey('');
      return groupTitle;
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  /**
   * 表格组标题行
   * @param groupTitle
   */
  const GroupTitle = (groupTitle: Item) => {
    return (
      <div className="group_title" key={groupTitle.id}>
        <div className="left">
          <span>{groupTitle.yhzhMc}</span>
        </div>
        <div className="right">
          <Button
            disabled={editingKey !== '' && editingKey !== groupTitle.id}
            onClick={() => editGroup(groupTitle)}
          >
            编辑
          </Button>
          <Button onClick={() => saveGroup(groupTitle)}>保存</Button>
          <Button onClick={() => delbatch(groupTitle)}>删除</Button>
        </div>
      </div>
    );
  };

  return (
    <MultifunctionalTable
      sourceData={sourceData}
      columns={columns}
      GroupTitle={GroupTitle}
      editingKey={editingKey}
      form={form}
    />
  );
};
