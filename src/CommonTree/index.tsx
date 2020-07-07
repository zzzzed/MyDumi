import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { Tree } from 'antd';
import { TreeProps } from 'antd/lib/tree';

interface CommonTreeProps extends TreeProps {
  gData: Array<any>;
  content?: ReactElement | ReactElement[] | null;
  style?: object;
  draggable?: boolean;
  onTreeSelect?: (param: any, e: any) => void;
  onTreeDropEnd?: (param: any) => void;
  checkTreeNode?: (param: any, e: any) => void;
  [name: string]: any;
  checkedKeys?: Array<any>;
  isExpandedKeys?: boolean;
}

export default function CommonTree(props: CommonTreeProps) {
  const {
    gData,
    checkable,
    draggable,
    content,
    height,
    checkedKeys,
    onTreeSelect,
    checkTreeNode,
    onTreeDropEnd,
    style,
    hasExpandedKeys,
  } = props;
  const [newgData, setNewgData] = useState(gData);
  const [newCheckedKeys, setNewCheckedKeys] = useState<any[] | undefined>(
    gData,
  );
  const [Iprops, setIProps] = useState<{ [name: string]: any }>({});

  useEffect(() => {
    if (checkable) setIProps({ ...Iprops, newCheckedKeys });
  }, []);

  useEffect(() => {
    setNewgData(gData);
    setNewCheckedKeys(checkedKeys);

    if (hasExpandedKeys) {
      setIProps({
        ...Iprops,
        ...{ expandedKeys: handleExpandedKeys(gData, []) },
      });
    }
  }, [gData, checkedKeys]);

  const onSelect = (selectedKeys: any, info: any) => {
    if (onTreeSelect) {
      onTreeSelect(selectedKeys, info);
    }
  };

  const onCheck = (checkedKeys: any, info: any) => {
    if (checkTreeNode) {
      checkTreeNode(checkedKeys, info);
    }
  };

  const dropEnd = () => {};

  const onDrop = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: any[],
      key: any,
      callback: { (item: any, index: any, arr: any): void },
    ) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...newgData];

    let dragObj: any;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: any[] = [];
      let i: number = 0;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr as any[];
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

  const handleExpandedKeys = (data: any[], arr: any[]) => {
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].key);
      if (data[i].children) {
        handleExpandedKeys(data[i].children, arr);
      }
    }
    return arr;
  };

  const onExpand = (expandedKeys: React.Key[]) => {
    if (props.hasExpandedKeys) {
      setIProps({ ...Iprops, expandedKeys });
    }
  };

  return (
    <div className="DialogMenuManagerLeft" style={style}>
      {content}
      <Tree
        checkable={checkable || false}
        draggable={draggable || false}
        blockNode
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={newgData}
        onDragEnd={dropEnd}
        onDrop={onDrop}
        onExpand={onExpand}
        height={height}
        {...Iprops}
      />
    </div>
  );
}
