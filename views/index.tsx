import '@views/assets/css/style.less';

import ReactDOM from 'react-dom';
import Root from '@views/routes';
import { remote } from 'electron';

ReactDOM.render(Root, window.document.getElementById('root'), () => {
  remote.getCurrentWindow().show();
  // const { app } = remote;
  // console.log(app.getAppPath());
  // console.log(app.getLocale());
  // console.log(app.getName());
  // console.log(app.getPath('userData'));
  // console.log(app.getPath('logs'));
  // console.log(app.getVersion());
});
