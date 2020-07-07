import React, { useState, useCallback } from 'react';
import { Menu, Dropdown } from 'antd';
import { CommonTree } from '../src';
import {
  MoreOutlined,
  PlusCircleOutlined,
  MenuFoldOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

const treeDataSource = [
  {
    name: '总部',
    key: '0',
    children: [
      {
        name: '业务部',
        key: '1',
        children: [
          {
            name: '业务部-1',
            key: '2',
          },
          {
            name: '业务部-2',
            key: '3',
          },
        ],
      },
      {
        name: '财务部',
        key: '4',
      },
    ],
  },
];

const treeData_2 = [
  {
    name: '总部',
    key: '0',
    children: [
      {
        name: '业务部',
        key: '1',
        children: [
          {
            name: '业务部-1',
            key: '2',
          },
          {
            name: '业务部-2',
            key: '3',
          },
        ],
      },
      {
        name: '财务部',
        key: '4',
        children: [
          {
            name: '新增节点',
            key: Math.random(),
          },
        ],
      },
    ],
  },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<Array<any>>([]);
  const [hoverKey, setHoverKey] = useState<string>('');
  const [treeData, setTreeData] = useState<any[]>(treeDataSource);

  /**
   * 点击树
   */
  const onTreeSelect = (selectedKeys: any, e: any) => {
    // ...
  };

  /**
   * 勾选树节点
   */
  const checkTreeNode = (selectedKeys: React.SetStateAction<any[]>, e: any) => {
    setCheckedKeys(selectedKeys);
  };

  /**
   * 更新树排序
   */
  const onTreeDropEnd = async (newgData: any) => {
    // ...
  };

  /**
   * function
   */
  const menuFunction = (data: any, e: MenuInfo) => {
    e.domEvent.stopPropagation();
    // ...
    setTreeData(treeData_2);
  };

  /**
   * 组装树结构
   */
  const formatTreeData = (
    data: any[],
    hasOption: boolean,
    expandedKeys: any[],
  ) => {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (hasOption) {
          data[i].title = (
            <span
              className="tree_item"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onMouseEnter={() => setHoverKey(data[i].key)}
              onMouseLeave={() => setHoverKey('')}
            >
              <span>{data[i].name}</span>
              {hoverKey === data[i].key ? (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={e => menuFunction(data[i], e)}>
                        <PlusCircleOutlined />
                        <span>功能菜单一</span>
                      </Menu.Item>
                      <Menu.Item onClick={e => menuFunction(data[i], e)}>
                        <DeleteOutlined />
                        <span>功能菜单二</span>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <div>
                    <MenuFoldOutlined />
                    <MoreOutlined />
                  </div>
                </Dropdown>
              ) : null}
            </span>
          );
        }

        if (data[i].children && data[i].children.length) {
          expandedKeys.push(data[i].key);
          formatTreeData(data[i].children, hasOption, expandedKeys);
        }
      }
    }
    return { data, expandedKeys };
  };

  return (
    <div className="DialogMenuManagerContent">
      <CommonTree
        style={{ width: '30%' }}
        checkable={true}
        draggable={true}
        onTreeSelect={onTreeSelect}
        checkTreeNode={checkTreeNode}
        onTreeDropEnd={onTreeDropEnd}
        content={
          <div
            className="addMenu"
            style={{
              color: '#537BFF',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <PlusCircleOutlined />
            <span>头部内容区域</span>
          </div>
        }
        gData={formatTreeData(treeData, true, []).data}
        checkedKeys={checkedKeys}
        hasExpandedKeys={true}
      />
    </div>
  );
};
