import React, { useState, useMemo, useRef, useEffect } from 'react';
import './VirtualList.less';
import { debounce as _debounce } from 'lodash';

interface IProps {
  itemSize: number; // 每项的高度
  listData: any[]; // 元数据
  screenHeight: number; // 可视区域高度
}

type IComputedData = {
  startOffset: number; // 偏移量
  startIndex: number; // 起始元素坐标
  endIndex: number | null; // 视口结束元素坐标
};

/**
 * 列表项固定高度
 */
const VirtualListRender = (props: IProps) => {
  const { itemSize, listData, screenHeight } = props;
  const listRef = useRef(null);

  const [computedData, setComputedData] = useState<IComputedData>({
    startOffset: 0,
    startIndex: 0,
    endIndex: null,
  });

  useEffect(() => {
    setComputedData({
      startOffset: 0,
      startIndex: 0,
      endIndex: visibleCount,
    });
  }, []);

  // 监听滚动事件
  const scrollEvent = _debounce(() => {
    //@ts-ignore
    let scrollTop = listRef.current.scrollTop;
    setComputedData({
      startIndex: Math.floor(scrollTop / itemSize),
      startOffset: scrollTop - (scrollTop % itemSize),
      endIndex: Math.floor(scrollTop / itemSize) + visibleCount,
    });
  }, 10);

  /**
   * 列表总高度
   */
  const listHeight = useMemo(() => {
    return listData.length * itemSize;
  }, [listData, itemSize]);

  const visibleCount = useMemo(() => {
    return Math.ceil(screenHeight / itemSize);
  }, [itemSize, screenHeight]);

  /**
   * 真实显示列表数据
   */
  const visibleData = useMemo(() => {
    if (computedData.endIndex) {
      return listData.slice(computedData.startIndex, computedData.endIndex);
    }
  }, [computedData.startIndex, computedData.endIndex, listData]);

  return (
    <div
      className="infinite-list-container"
      style={{
        height: screenHeight,
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
            className={`infinite-list-item infinite-list-item-${item.id}`}
            style={{
              height: itemSize,
              lineHeight: `${itemSize - 21}px`,
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
  screenHeight: document.body.clientHeight,
};

export default VirtualListRender;
