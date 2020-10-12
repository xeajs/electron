import '@views/assets/css/style.css';

import App from '@views/routes';
import ReactDOM from 'react-dom';
import Store from '@views/store';
import { remote } from 'electron';

ReactDOM.render(App, window.document.getElementById('root'), () => {
  remote.getCurrentWindow().show();
  const changeClickTotal = () => {
    Store.Setting.SetSettings({ clickTotal: Store.Setting.settings.clickTotal + 1 });
  };
  window.addEventListener('click', changeClickTotal);
  remote.app.on('window-all-closed', () => {
    window.removeEventListener('click', changeClickTotal);
  });
});
