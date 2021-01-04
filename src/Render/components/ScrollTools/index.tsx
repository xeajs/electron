import * as utils from '@/Render/utils';

import React, { memo, useEffect, useRef, useState } from 'react';

import { BackwardOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { remote } from 'electron';
import { useHistory } from 'react-router';

interface ThresholdType {
  /** key */
  Key: string;
  /** 滚动区间 */
  section: [number, number];
}
export type SettingsDataSource = {
  Label: React.ReactElement | string;
  Content: React.ReactElement;
  Key: string;
};
interface BaseProps {
  source: SettingsDataSource[];
  /** 每个设置也最小高度是否 填充满视口 */
  isFullScreen?: boolean;
}

/** 手动触发滚动时屏蔽滚动事件的触发, 需要同步设置值 */
Reflect.set(window, '__scrollLock__', false);

const Wrap: React.FC<BaseProps> = (props) => {
  const [activeKey, setActiveKey] = useState<string>(props.source[0].Key);
  const [thresholdMap, setThresholdMap] = useState<ThresholdType[]>([]);
  const [watchWinResize, setWatchWinResize] = useState(Boolean);
  /** 允许最小高度为 满屏的时候的初始化高度，动态变化 */
  const [fullScreenHeight, setFullScreenHeight] = useState(0);
  const InnerWrapRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  /**
   * @Msg 初始化页面基础信息
   * @Msg 配置 滚动区间阈值
   */
  useEffect(() => {
    const resizeHandle = utils.debounce(() => {
      setWatchWinResize(!watchWinResize);
    });
    remote.getCurrentWindow().on('resize', resizeHandle);
    return () => {
      remote.getCurrentWindow().off('resize', resizeHandle);
    };
  }, []);
  useEffect(() => {
    if (!InnerWrapRef || !InnerWrapRef.current) return;
    const thresholdArr: ThresholdType[] = [];
    Array.prototype.forEach.call(InnerWrapRef.current.children, (item: HTMLLIElement, index, list) => {
      const currentElementHeight = item.getBoundingClientRect().height;
      const currentElement: ThresholdType = { Key: item.getAttribute('wrap-key') as string, section: [0, 0] };
      /** 不是第一个，则取上一个的最大值为当前的最小值 */
      const a = index === 0 ? 0 : thresholdArr[index - 1].section[1];
      /** 不是第一个，则取上一个的最大值加上当前的高度为当前的最大值 */
      const b = index === 0 ? currentElementHeight : currentElementHeight + thresholdArr[index - 1].section[1];
      Reflect.set(currentElement, 'section', [a, b]);
      thresholdArr.push(currentElement);
    });
    setThresholdMap(thresholdArr);
  }, [InnerWrapRef, watchWinResize, fullScreenHeight]);

  const getBoundingClientRectWithRender = () => {
    const height = InnerWrapRef.current?.getBoundingClientRect().height || 0;
    const preHeight = document.getElementsByClassName('full-screen')[0]?.getBoundingClientRect()?.height;
    /** 记录高度变更 */
    if (Reflect.get(window, '__scrollLock__debounce') !== preHeight) {
      Reflect.set(window, '__scrollLock__debounce', preHeight);
      setFullScreenHeight(preHeight + 64);
    }
    return height;
  };

  const changeActiveKey = (activeKey: string) => {
    setActiveKey(activeKey);
    if (!InnerWrapRef || !InnerWrapRef.current) return;
    if (!document.querySelectorAll('.innerWrapItem').length) return;
    if (!thresholdMap.length) return;
    const currentThresholdMap = thresholdMap.find((item) => {
      return activeKey === item.Key;
    });
    if (!currentThresholdMap) return;
    Reflect.set(window, '__scrollLock__', true);
    InnerWrapRef.current.scrollTo({
      behavior: 'auto',
      left: 0,
      top: currentThresholdMap.section[0]
    });
    setTimeout(() => {
      Reflect.set(window, '__scrollLock__', false);
    }, 60 * 10);
  };
  const onScroll = utils.debounce((e: { target: HTMLDivElement }) => {
    if (Reflect.get(window, '__scrollLock__') || !e || !e.target) return;
    const target: HTMLDivElement = e.target;
    const scrollTop = target.scrollTop;
    const currentElement = thresholdMap.find((item) => {
      return scrollTop >= item.section[0] && scrollTop <= item.section[1];
    });
    if (!currentElement || !currentElement.Key) return;
    setActiveKey(currentElement.Key);
  }, 1);
  const LabelWrap = (
    <section className="labelWrap">
      <section className="fullback" onClick={() => history.goBack()}>
        <BackwardOutlined size={18} />
        &nbsp;设置
      </section>

      <Tabs tabPosition="left" onChange={changeActiveKey} activeKey={activeKey}>
        {props.source.map((item) => (
          <Tabs.TabPane tab={item.Label} key={item.Key} disabled={false} />
        ))}
      </Tabs>
      <style jsx>{`
        .fullback {
          height: 32px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 16px;
          border-radius: 2px;
          padding: 0 8px;
          color: #666;
          background-color: #e9ecf2;
          cursor: default;
          margin-top: 0px;
          margin-left: -6px;
          margin-right: -6px;
        }
        .fullback:hover {
          opacity: 0.7;
        }
        .labelWrap {
          width: 168px;
          height: 100%;
          overflow-y: auto;
          padding: 6px;
          padding-top: 0px;
          background: rgb(245, 245, 245);
          border-right: 1px solid #fff;
          border-top: 1px solid #fff;
        }
      `}</style>
      <style jsx global>{`
        .labelWrap .ant-tabs .ant-tabs-left-bar {
          border-right: 0 none;
          float: left;
          width: 98%;
        }
        .labelWrap .ant-tabs .ant-tabs-tab {
          text-align: left;
        }
        .labelWrap .ant-tabs .ant-tabs-content-holder {
          display: none;
          width: 0;
          overflow: hidden;
        }
        .labelWrap .ant-tabs .ant-tabs-nav {
          flex: 1 !important;
        }
      `}</style>
    </section>
  );
  const InnerWrap = (
    <section
      className="innerWrap"
      ref={InnerWrapRef}
      onScroll={(e) => {
        e.persist();
        onScroll(e);
      }}
    >
      {props.source.map((item, index) => (
        <section className={`innerWrapItem ${(index === 0 && 'innerWrapFirst') || ''}`} key={item.Key} wrap-key={item.Key}>
          <div className="seizeAseat"></div>
          <div className={`${props.isFullScreen ? 'full-screen' : ''}`}>{item.Content}</div>
          <div className="seizeAseat"></div>
        </section>
      ))}
      <style jsx>{`
        .innerWrap {
          flex: 1;
          overflow-y: scroll;
          overflow-x: hidden;
          padding: 0 16px;
          border-left: 0.5px solid #f2f2f2;
        }
        .innerWrapItem {
          border-top: 1px solid #f2f2f2;
          padding: 0;
          margin: 0;
        }
        .seizeAseat {
          height: 32px;
        }
        .innerWrapFirst {
          border-top: 0 none;
        }
        .full-screen {
          min-height: calc(${getBoundingClientRectWithRender()}px - 64px);
        }
      `}</style>
    </section>
  );
  return (
    <section className="scrollTolls">
      {LabelWrap}
      {InnerWrap}
      <style jsx>{`
        .scrollTolls {
          display: flex;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default memo(Wrap);
