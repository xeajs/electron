import '@/Render/assets/css/style.css';
import '@/Render/assets/css/antd/index.less';

import App from '@/Render/route';
import ReactDOM from 'react-dom';
import { remote } from 'electron';

ReactDOM.render(App, window.document.getElementById('root'), remote.getCurrentWindow().show);

window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
  $$.log.error(error, error?.stack);
};
