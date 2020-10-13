const shell = require('shelljs');
const childProcess = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { EventEmitter } = require('events');
const Handle = require('./handle');
const pkg = require('../package.json');
const config = require('../config');

class Command extends EventEmitter {
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
  }

  async views() {
    const isPro = process.env.NODE_ENV === 'production';
    const webpackConf = require('./webpack/webpack.views.config');
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(Handle.ViewsPro);
    }
    const devServerOptions = {
      hot: true,
      open: false,
      hotOnly: true,
      noInfo: true,
      stats: 'errors-only',
      clientLogLevel: 'error',
      overlay: { errors: true, warnings: true },
      ...config.devServer
    };
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync({ name: 'XeaCompiledDevServerDoneOnce' }, (compilation, callback) => {
        if (!this.AutoOpenApp.views) {
          this.AutoOpenApp.views = true;
        }
        callback();
      });
    }
    return new WebpackDevServer(compiler, devServerOptions).listen(config.port + 1);
  }

  async serve() {
    const isPro = process.env.NODE_ENV === 'production';
    const webpackConf = require('./webpack/webpack.serve.config');
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(Handle.ServePro);
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
    compiler.watch(watchOptions, Handle.ServeDev);
  }

  build() {
    process.env.NODE_ENV = 'production';
    this.serve();
    this.views();
  }
  builder() {
    if (process.platform === 'darwin') {
      shell.exec('electron-builder --mac --x64');
    }
    if (process.platform === 'win32') {
      shell.exec('electron-builder --win --ia32');
    }
  }
  start() {
    process.env.NODE_ENV = 'development';
    this.once('openApp', () => {
      this.app();
      if (config.tslint) {
        let appPath = `tsc -w`;
        const appProcess = childProcess.exec(appPath);
        const echoChunk = (chunk) => {
          console.info(chunk);
        };
        appProcess.stdout.on('data', echoChunk);
        appProcess.stdout.on('error', echoChunk);
        appProcess.stderr.on('data', echoChunk);
        appProcess.stderr.on('error', echoChunk);
      }
    });
    this.views();
    this.serve();
  }

  help() {
    console.log(`
    Command:    node xeajs

    Options:    [app, kill, start, build, serve, views]
    `);
  }

  kill() {
    shell.exec(`taskkill /f /t /im electron.exe`);
    shell.exec(`taskkill /f /t /im ${pkg.build.productName}.exe`);
  }

  app() {
    let appPath = `nodemon -e js,ts,tsx -w src/Initialization -w src/MainProcess -w package.json -w index.js --exec electron . --inspect`;
    if (!config.nodemon) {
      appPath = `electron . --inspect`;
    }
    const appProcess = childProcess.exec(appPath);
    const echoChunk = (chunk) => {
      console.info(chunk);
    };
    appProcess.stdout.on('data', echoChunk);
    appProcess.stdout.on('error', echoChunk);
    appProcess.stderr.on('data', echoChunk);
    appProcess.stderr.on('error', echoChunk);
  }
}

module.exports = Command;
