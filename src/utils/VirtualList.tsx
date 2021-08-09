import React, { useState, useMemo, useRef, useEffect } from 'react';
import './VirtualList.less';

interface IProps {
  itemSize: number;
  listData: any[];
  screenHeight?: number;
}

type IComputedData = {
  startOffset: number;
  startIndex: number;
  endIndex: number | null;
};
/**
 * 列表项固定高度
 */
const VirtualListRender = (props: IProps) => {
  const { itemSize, listData, screenHeight } = props;
  const realScreenHeight = screenHeight ?? document.body.clientHeight; // 可是区域高度

  const listRef = useRef(null);

  const [computedData, setComputedData] = useState<IComputedData>({
    startOffset: 0,
    startIndex: 0,
    endIndex: 10,
  });

  // 监听滚动事件
  const scrollEvent = () => {
    //@ts-ignore
    let scrollTop = listRef.current.scrollTop;
    setComputedData({
      startIndex: Math.floor(scrollTop / itemSize),
      startOffset: scrollTop - (scrollTop % itemSize),
      endIndex: Math.floor(scrollTop / itemSize) + visibleCount,
    });
  };

  /**
   * 列表总高度
   */
  const listHeight = useMemo(() => {
    return listData.length * itemSize;
  }, [listData, itemSize]);

  const visibleCount = useMemo(() => {
    return Math.ceil(realScreenHeight / itemSize);
  }, [itemSize]);

  /**
   * 真实显示列表数据
   */
  const visibleData = useMemo(() => {
    if (computedData.endIndex) {
      return listData.slice(computedData.startIndex, computedData.endIndex);
    }
  }, [computedData.startIndex, computedData.endIndex, listData]);

  return (
    /**
     * infinite-list-container 可视区域容器
     * infinite-list-phantom 容器内的占位，高度为总列表高度，用于形成滚动条
     * infinite-list 列表渲染区域
     */
    <div
      className="infinite-list-container"
      style={{
        height: realScreenHeight,
      }}
      ref={listRef}
      onScroll={scrollEvent}
    >
      <div
        className="infinite-list-phantom"
        style={{ height: listHeight }}
      ></div>

      <div
        className="infinite-list"
        style={{
          transform: `translate3d(0,${computedData.startOffset}px,0)`,
        }}
      >
        {visibleData?.map(item => (
          <div
            className="infinite-list-item"
            style={{
              height: itemSize,
              lineHeight: itemSize,
            }}
            key={item.id}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

VirtualListRender.defaultProps = {
  itemSize: 50,
};

export default VirtualListRender;
