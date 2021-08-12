import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
} from 'react';
import './VirtualList.less';
import { cloneDeep } from 'lodash';

/**
 * 虚拟列表-动态高度
 * 核心：初始时先预估高度，待一部分元素渲染完成再获取真实高度
 */

interface IProps {
  listData: any[]; // 元数据
  estimatedItemSize: number; // 预估高度
  bufferScale: number; // 缓冲区比例
  height: number | string; // 容器高度
  screenHeight: number; // 可视区域高度
}

type IComputedData = {
  startIndex: number;
  endIndex: number;
};

type IPosition = {
  bottom: number;
  top: number;
  height: number;
  index: number;
};

const VirtualListPro = (props: IProps) => {
  const { listData, estimatedItemSize, bufferScale, screenHeight } = props;

  const [computedData, setComputedData] = useState<IComputedData>({
    startIndex: 0,
    endIndex: 0,
  });

  const [positions, setPositions] = useState<IPosition[]>([]); // 对元数据进行处理，加上height，top，bottom等参数
  const [height, setHeight] = useState<number | string>(props.height); // 列表总高度
  const itemsRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setComputedData({
      startIndex: 0,
      endIndex: visibleCount,
    });
    initialPositions();
  }, []);

  useEffect(() => {
    //@ts-ignore
    if (!itemsRef.current?.children && !itemsRef.current?.children.length)
      return;
    if (positions && positions.length) {
      // 元素已经渲染，获取元素真实大小，修改对应的尺寸缓存
      updateItemsSize();
    }
  }, [computedData]);

  useEffect(() => {
    // 更新列表总高度
    setHeight(positions[positions.length - 1]?.bottom);
  }, [positions]);

  /**
   * 初始设置每个元素的坐标值
   */
  const initialPositions = () => {
    let res = listData.map((_, index) => ({
      index,
      height: estimatedItemSize,
      top: index * estimatedItemSize,
      bottom: (index + 1) * estimatedItemSize,
    }));
    setPositions(res);
  };

  /**
   * 可视区域元素数量
   * @returns number
   */
  const visibleCount = useMemo(() => {
    return Math.ceil(screenHeight / estimatedItemSize);
  }, [screenHeight, estimatedItemSize]);

  /**
   * 可视区上方元素数量
   */
  const aboveCount: number = useMemo(() => {
    return Math.min(computedData.startIndex, bufferScale * visibleCount);
  }, [computedData, bufferScale, visibleCount]);

  /**
   * 可视区下方元素数量
   */
  const belowCount: number = useMemo(() => {
    return Math.min(
      listData.length - computedData.endIndex,
      bufferScale * visibleCount,
    );
  }, [listData, computedData.startIndex, bufferScale, visibleCount]);

  /**
   * 可视区域数据
   */
  const visibleData = useMemo(() => {
    let start = computedData.startIndex - aboveCount;
    let end = computedData.endIndex + belowCount;
    return listData.slice(start, end);
  }, [computedData.startIndex, computedData.endIndex]);

  //获取列表起始索引
  const getStartIndex = (scrollTop: number = 0) => {
    //二分法查找
    return binarySearch(positions, scrollTop);
  };

  /**
   * 二分查找，查找起始的index
   * @param list
   * @param value
   */
  const binarySearch = (list: any[], value: number): number => {
    let start = 0;
    let end = list.length - 1;
    let tempIndex = null;
    while (start <= end) {
      let midIndex = (start + end) >> 1;
      let midValue = list[midIndex]?.bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end--;
      }
    }
    return tempIndex ?? 0;
  };
  /**
   * 获取列表项的当前尺寸
   */
  const updateItemsSize = () => {
    // @ts-ignore
    let nodes = itemsRef.current?.children as any[];
    nodes.forEach(node => {
      // 获取每个列表项元素的大小和相对于视口的位置
      let rect = node.getBoundingClientRect();
      let height = rect.height;
      let index = +node.id;
      let oldHeight = positions[index]?.height;
      let dValue = oldHeight - height;
      // 如果实际高度与预估高度存在差异
      if (dValue) {
        debugger;
        let cloneData = cloneDeep(positions);
        cloneData[index].bottom = cloneData[index].bottom - dValue;
        cloneData[index].height = height;
        for (let k = index + 1; k < cloneData.length; k++) {
          cloneData[k].top = cloneData[k - 1].bottom;
          cloneData[k].bottom = cloneData[k].bottom - dValue;
        }
        setPositions(cloneData);
      }
    });
  };

  /**
   * 设置偏移量
   */
  const setStartOffset = useMemo(() => {
    let startOffset;
    if (computedData.startIndex >= 1) {
      let size =
        positions[computedData.startIndex].top -
        (positions[computedData.startIndex - aboveCount]?.top || 0);
      startOffset = positions[computedData.startIndex - 1].bottom - size;
    } else {
      startOffset = 0;
    }
    return `translate3d(0,${startOffset}px,0)`;
  }, [positions, aboveCount, computedData]);

  const scrollEvent = () => {
    //当前滚动位置
    //@ts-ignore
    let scrollTop = listRef.current?.scrollTop;

    //此时的开始索引
    //此时的结束索引
    setComputedData({
      startIndex: getStartIndex(scrollTop),
      endIndex: getStartIndex(scrollTop) + visibleCount,
    });
    //此时的偏移量
  };

  return (
    <div
      style={{
        height: screenHeight,
      }}
      ref={listRef}
      className="infinite-list-container"
      onScroll={scrollEvent}
    >
      <div className="infinite-list-phantom" style={{ height: height }}></div>

      <div
        ref={itemsRef}
        className="infinite-list"
        style={{ textAlign: 'left', width: '50%', transform: setStartOffset }}
      >
        {visibleData?.map((item, index) => (
          <div className="infinite-list-item" id={`${item.id}`} key={index}>
            <span style={{ color: 'red' }}>{item.id}</span>
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

VirtualListPro.defaultProps = {
  screenHeight: document.body.clientHeight,
  height: '100%',
};

export default VirtualListPro;
