import Header from '@views/components/Header';
import IconSettings from '@views/components/SVG/Settings';
import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = (props) => {
  const history = useHistory();
  const [showPathname, setShowPathname] = React.useState(false);
  React.useEffect(() => {
    window.document.onkeydown = (e) => {
      if (!e || e.keyCode !== 18 || $$.isPro()) return;
      setShowPathname(true);
    };
    window.document.onkeyup = () => {
      setShowPathname(false);
    };
    return () => {
      setShowPathname(false);
    };
  }, []);
  return (
    <section className="ui-vw-100 ui-vh-100 flex-col">
      <Header>
        {showPathname && (
          <section className="showPathname">
            <span className="showPathnameText">{history.location.pathname}</span>
          </section>
        )}
        <div className="flex just-center align-center ui-w-100 ui-h-100">
          <div className="flex-1 ui-h-100 flex just-center align-center drag">Xeajs Electron</div>
          <IconSettings
            onFunc={() => {
              history.push('/settings');
            }}
          />
        </div>
      </Header>
      <main className="flex-1 ui-ovy-a ui-w-100 ui-h-100">{props.children}</main>
      <footer className="flex just-center align-center">@Copyright 2019 - {new Date().getFullYear()}</footer>
      <style jsx>{`
        footer {
          background-color: #ececec;
          border-top: 1px solid #f2f2f2;
          font-size: 12px;
          height: 32px;
          position: relative;
        }
        footer::before {
          content: '';
          position: absolute;
          top: 1px;
          left: 0;
          height: 1px;
          width: 100%;
          background-color: #fff;
        }
        .showPathname {
          height: 30px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 1024;
        }
        .showPathnameText {
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.6);
          padding: 0 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #fff;
        }
      `}</style>
    </section>
  );
};

export default Wrap;
