const minimist = require('minimist');
const shell = require('shelljs');
const childProcess = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const options = require('./config');
const argv = minimist(process.argv.slice(2))['_'];
const event = require('events');
const utils = require('./utils');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}
const isPro = process.env.NODE_ENV === 'production';

class Command extends event.EventEmitter {
  constructor() {
    super();
    this.AutoOpenApp = new Proxy(
      {
        views: false,
        serve: false
      },
      {
        set: (target, props, value) => {
          const isOk = Reflect.set(target, props, value);
          if (target.serve && target.views) {
            this.emit('openApp');
          }
          return isOk;
        }
      }
    );
    this.once('openApp', () => {
      this.openApp();
    });
  }

  async views() {
    const webpackConf = require('./webpack/webpack.views.config')(options);
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(utils.ViewsPro);
    }
    const devServerOptions = {
      ...options.devServer,
      overlay: { errors: true, warnings: true }
    };
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync({ name: 'XeaCompiledDevServerDoneOnce' }, (compilation, callback) => {
        if (!this.AutoOpenApp.views) {
          this.AutoOpenApp.views = true;
        }
        callback();
      });
    }
    return new WebpackDevServer(compiler, devServerOptions).listen(options.devServer.port);
  }

  async serve() {
    const webpackConf = require('./webpack/webpack.serve.config')(options);
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(utils.ServePro);
    }
    const watchOptions = {
      ignored: [/node_modules/, /package\.json/, /views/]
    };
    compiler.hooks.done.tapAsync({ name: 'XeaCompiledWatchDoneOnce' }, (compilation, callback) => {
      if (!this.AutoOpenApp.serve) {
        this.AutoOpenApp.serve = true;
      }
      callback();
    });
    compiler.watch(watchOptions, utils.ServeDev);
  }

  async kill() {
    shell.exec(`taskkill /f /t /im electron.exe`);
  }

  async openApp() {
    const appPath = `nodemon -e js,ts,tsx --watch ./serve --watch ./global --watch index.js --exec electron . --inspect`;
    const appProcess = childProcess.exec(appPath);
    const __console__ = (chunk) => {
      console.error(chunk);
    };
    appProcess.stdout.on('data', __console__);
    appProcess.stdout.on('error', __console__);
    appProcess.stderr.on('data', __console__);
    appProcess.stderr.on('error', __console__);
  }
}

const command = new Command();
argv.forEach((commandItem) => {
  if (!command[commandItem] || typeof command[commandItem] !== 'function') return;
  command[commandItem]();
});
