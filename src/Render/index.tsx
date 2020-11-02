import '@/Render/assets/css/style.css';

import App from '@/Render/routes';
import ReactDOM from 'react-dom';
import { remote } from 'electron';

ReactDOM.render(App, window.document.getElementById('root'), remote.getCurrentWindow().show);
