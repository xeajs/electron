const shell = require('shelljs');
const childProcess = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { EventEmitter } = require('events');
const Utils = require('./utils');
const config = require('../../config');

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
    const webpackConf = require('../webpack/config/webpack.views.config');
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(Utils.ViewsPro);
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
    const webpackConf = require('../webpack/config/webpack.serve.config');
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(Utils.ServePro);
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
    compiler.watch(watchOptions, Utils.ServeDev);
  }

  build() {
    process.env.NODE_ENV = 'production';
    this.views();
    this.serve();
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
    Command:    node .xea/cli

    Options:    [app, kill, start, build, serve, views]
    `);
  }

  kill() {
    shell.exec(`taskkill /f /t /im electron.exe`);
  }

  app() {
    let appPath = `nodemon -e js,ts,tsx -w serve -w global -w package.json -w index.js --exec electron . --inspect`;
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
