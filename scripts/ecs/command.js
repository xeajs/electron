const Core = require('./core');
const shell = require('shelljs');
const webpack = require('webpack');
const config = require('../../config');
const pkg = require('../../package.json');
const { EventEmitter } = require('events');
const childProcess = require('child_process');
const WebpackDevServer = require('webpack-dev-server');
const MainProcessWebpackConfig = require('./webpack/Main/webpack.config.js');
const RenderProcessWebpackConfig = require('./webpack/Render/webpack.config.js');

class Command extends EventEmitter {
  constructor() {
    super();
    this.AutoOpenApp = new Proxy(
      {
        _RenderProcessDone: false,
        _MainProcessDone: false
      },
      {
        set: (target, props, value) => {
          const isOk = Reflect.set(target, props, value);
          if (target._MainProcessDone && target._RenderProcessDone) {
            this.emit('openApp');
          }
          return isOk;
        }
      }
    );
  }

  /** Readme */
  childProcessExec(runPath) {
    const _childProcess = childProcess.exec(runPath);
    _childProcess.stdout.on('data', console.info);
    _childProcess.stdout.on('error', console.info);
    _childProcess.stderr.on('data', console.info);
    _childProcess.stderr.on('error', console.info);
  }

  /** Readme */
  async RenderProcess() {
    const compiler = webpack(RenderProcessWebpackConfig);
    if (Core.isPro()) return compiler.run(Core.RenderProcessPro);
    const userDevServer = config.devServer || {};
    const devServerOptions = {
      hot: true,
      open: false,
      hotOnly: true,
      noInfo: true,
      stats: 'errors-only',
      clientLogLevel: 'error',
      overlay: { errors: true, warnings: true },
      ...userDevServer
    };
    compiler.hooks &&
      compiler.hooks.done.tapAsync({ name: 'CompiledRenderProcessOnce' }, (compilation, callback) => {
        if (!this.AutoOpenApp._RenderProcessDone) this.AutoOpenApp._RenderProcessDone = true;
        callback();
      });
    new WebpackDevServer(compiler, devServerOptions).listen(config.port + 1);
  }

  /** Readme */
  async MainProcess() {
    const compiler = webpack(MainProcessWebpackConfig);
    if (Core.isPro()) return compiler.run(Core.MainProcessPro);
    const watchOptions = { ignored: /(node_modules|Render|package\.json)/ };
    compiler.hooks.done.tapAsync({ name: 'CompiledMainProcessOnce' }, (compilation, callback) => {
      if (!this.AutoOpenApp._MainProcessDone) this.AutoOpenApp._MainProcessDone = true;
      callback();
    });
    compiler.watch(watchOptions, Core.MainProcessDev);
  }

  /** Readme */
  build() {
    process.env.NODE_ENV = 'production';
    this.MainProcess();
    this.RenderProcess();
  }

  /** Readme */
  builder() {
    switch (process.platform) {
      case 'win32':
        shell.exec('electron-builder --win --ia32');
        break;
      case 'darwin':
        shell.exec('electron-builder --mac --x64');
        break;
      case 'linux':
        shell.exec('electron-builder --linux');
        break;
      default:
        shell.exec('electron-builder --win --ia32');
        break;
    }
  }

  /** Readme */
  start() {
    process.env.NODE_ENV = 'development';
    this.once('openApp', () => {
      this.app();
      if (config.tslint) this.childProcessExec(`tsc -w`);
    });
    this.MainProcess();
    this.RenderProcess();
  }

  /** Readme */
  help() {
    console.log(`
    Command:    node electron-cli-service

    Options:    [start, build, kill]
    `);
  }

  /** Readme */
  kill() {
    shell.exec(`taskkill /f /t /im electron.exe`);
    shell.exec(`taskkill /f /t /im ${pkg.build.productName}.exe`);
  }

  /** Readme */
  app() {
    if (config.nodemon) {
      this.childProcessExec(`nodemon -e js,ts,tsx -w dist -w package.json -w index.js --exec electron . --inspect`);
    } else {
      this.childProcessExec(`electron . --inspect`);
    }
  }

  /** Extends */
  autoVersion() {
    require('../run/auto-version');
  }
}

module.exports = Command;
