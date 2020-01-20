import ReactDOM from 'react-dom';
import Routes from '@/routes/index';
import { registerHotKey } from '@/utils';

require('@/assets/css/style.css');

ReactDOM.render(Routes, window.document.getElementById('root'), () => {
  registerHotKey();
});
