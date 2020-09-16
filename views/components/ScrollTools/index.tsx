import React, { memo, useEffect, useRef, useState } from 'react';
import { Tabs, Tag } from 'antd';

import { BackwardOutlined } from '@ant-design/icons';
import { remote } from 'electron';
import { useHistory } from 'react-router';
import utils from '@views/utils';

interface ThresholdType {
  /** key */
  Key: string;
  /** 滚动区间 */
  section: [number, number];
}
type SettingsSourceData = {
  Label: React.ReactElement | string;
  Inner: React.ReactElement;
  Key: string;
};
interface BaseProps {
  source: SettingsSourceData[];
}

/** 手动触发滚动时屏蔽滚动事件的触发, 需要同步设置值 */
Reflect.set(window, '__scrollLock__', false);

const Wrap: React.FC<BaseProps> = (props) => {
  const [activeKey, setActiveKey] = useState<string>(props.source[0].Key);
  const [thresholdMap, setThresholdMap] = useState<ThresholdType[]>([]);
  const [watchWinResize, setWatchWinResize] = useState(Boolean);
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
  }, [InnerWrapRef, watchWinResize]);
  const changeActiveKey = (activeKey) => {
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
  const onScroll = utils.debounce((e) => {
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
          {item.Inner}
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
