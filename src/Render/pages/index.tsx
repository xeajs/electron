import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

const RootPageWrap = () => {
  const history = useHistory();
  return (
    <div className="wallpaper ui-vw-100 ui-vh-100 drag flex-col">
      <div className="flex-1"></div>
      <div className="flex just-center no-drag">
        <Button type="primary" onClick={() => history.push('/home')}>
          立即探索
        </Button>
      </div>
      <div style={{ height: '10px' }}></div>
      <style jsx>{`
        .wallpaper {
          overflow: hidden;
          background-image: url(/public/assets/wallpaper/wallpaper001.jpg);
          background-size: cover;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
};
export default RootPageWrap;
