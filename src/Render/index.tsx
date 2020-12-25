import '@/Render/assets/css/antd/index.less';
import '@/Render/assets/css/style/index.css';

import App from '@/Render/route';
import ReactDOM from 'react-dom';
import { remote } from 'electron';

ReactDOM.render(App, window.document.getElementById('root'), remote.getCurrentWindow().show);
