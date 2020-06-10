import React, { useEffect, useRef, useState } from 'react';

import { Tabs } from 'antd';
import utils from '@views/utils';

interface ThresholdType {
  title: string;
  scrollTopSection: [number, number];
  threshold: number;
}
interface SettingsSourceData {
  Wrap: React.ReactElement;
  title: string;
}
interface BaseProps {
  height: number;
  source: SettingsSourceData[];
}

/** 手动触发滚动时屏蔽滚动事件的触发, 需要同步设置值 */
let handScrollLock = false;
/** 距离顶部 x 算下一项 */
const toTopPx = 20;
const Wrap: React.FC<BaseProps> = (props) => {
  const [activeKey, setActiveKey] = useState<string>(props.source[0].title);
  const [threshold, setThreshold] = useState<ThresholdType[]>([]);
  /** 手动触发滚动时屏蔽滚动事件的触发, 需要同步设置值 */
  const RefScroll = useRef<HTMLUListElement>(null);
  /** 初始化页面基础信息 */
  useEffect(() => {
    if (!RefScroll || !RefScroll.current) return;
    const thresholdArr: ThresholdType[] = [];
    for (const key of props.source) {
      thresholdArr.push({ title: key.title, threshold: 0, scrollTopSection: [0, 0] });
    }
    Array.prototype.forEach.call(RefScroll.current.children, (item: HTMLLIElement) => {
      const _liName = item.getAttribute('data-name');
      const _liHeight = item.getBoundingClientRect().height;
      const _index = thresholdArr.findIndex((v) => v.title === _liName);
      thresholdArr[_index].threshold = thresholdArr.reduce((acc, val, key) => {
        if (key <= _index) {
          return acc + val.threshold;
        } else {
          return acc;
        }
      }, _liHeight);
      thresholdArr[_index].scrollTopSection = ((): [number, number] => {
        const a = thresholdArr[_index - 1] ? thresholdArr[_index - 1].threshold : 0;
        const b = thresholdArr[_index].threshold;
        return [a, b];
      })();
    });
    setThreshold(thresholdArr);
  }, [RefScroll, props.height]);
  const changeActiveKey = (activeKey) => {
    setActiveKey(activeKey);
    handScrollLock = true;
    if (!RefScroll || !RefScroll.current) return;
    const findResult = threshold.find((val) => {
      return activeKey === val.title;
    });
    RefScroll.current.scrollTo({
      left: 0,
      top: (findResult && findResult.scrollTopSection[0]) || 0
    });
    setTimeout(() => {
      handScrollLock = false;
    }, 100);
  };
  const onScroll = utils.debounce((e) => {
    if (handScrollLock || !e || !e.target) return;
    const target: HTMLUListElement = e.target;
    const scrollTop = target.scrollTop + toTopPx;
    const currentLi = threshold.find((val) => {
      return scrollTop >= val.scrollTopSection[0] && scrollTop <= val.scrollTopSection[1];
    });
    if (!currentLi || !currentLi.title) return;
    setActiveKey(currentLi.title);
  });
  return (
    <>
      <section className="settings">
        <Tabs tabPosition="left" onChange={changeActiveKey} activeKey={activeKey} style={{ height: props.height }}>
          {props.source.map((item) => (
            <Tabs.TabPane tab={item.title} key={item.title} disabled={false} />
          ))}
        </Tabs>
        <ul
          className="scroll-inner"
          style={{ height: props.height + 'px' }}
          ref={RefScroll}
          onScroll={(e) => {
            e.persist();
            onScroll(e);
          }}
        >
          {props.source.map((item, index) => (
            <li style={{ minHeight: props.height + 'px' }} className={index >= props.source.length - 1 ? '' : 'line'} key={item.title} data-name={item.title}>
              {item.Wrap}
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{`
        .settings {
          height: 100%;
          display: flex;
        }
        .line {
          position: relative;
          padding-bottom: 120px;
        }
        .line::before {
          content: '';
          position: absolute;
          bottom: 65px;
          left: 65px;
          right: 65px;
          height: 1px;
          background-color: #ddd;
        }
        .scroll-inner {
          flex: 1;
          overflow-y: auto;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Wrap;
