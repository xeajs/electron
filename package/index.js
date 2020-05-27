const minimist = require('minimist');
const shell = require('shelljs');
const childProcess = require('child_process');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const options = require('./options');
const argv = minimist(process.argv.slice(2))['_'];
let readyViews = false;
let readyServe = false;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}
const isPro = process.env.NODE_ENV === 'production';

const statsErrorHandle = (error, stats) => {
  if (error) {
    console.error(error);
  }
  if (stats.hasErrors()) {
    const string = stats.toString({
      colors: true,
      errors: true,
      all: false
    });
    console.error(string);
  }
};

const statsHandle = {
  dev: {
    views: () => {
      readyViewsFunc();
    },
    serve: (error, stats) => {
      statsErrorHandle(error, stats);
      readyServeFunc();
    }
  },
  pro: {
    views: (error, stats) => {
      statsErrorHandle(error, stats);
      console.info(
        stats.toString({
          colors: true,
          builtAt: true,
          timings: true,
          version: true,
          assets: true,
          errors: true,
          hash: true,
          all: false,
          chunks: false,
          modules: false,
          source: false
        })
      );
    },
    serve: (error, stats) => {
      statsHandle.pro.views(error, stats);
    }
  }
};
const command = {
  async views() {
    const webpackConf = require('./webpack/webpack.views.config')(options);
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(statsHandle.pro.views);
    }
    const webpackWatch = new WebpackDevServer(compiler, {
      ...options.devServer,
      after(app, server, compiler) {
        statsHandle.dev.views();
        if (options.devServer.after) {
          options.devServer.after(app, server, compiler);
        }
      },
      overlay: { errors: true, warnings: true }
    });
    webpackWatch.listen(options.devServer.port);
  },
  async serve() {
    const webpackConf = require('./webpack/webpack.serve.config')(options);
    const compiler = webpack(webpackConf);
    if (isPro) {
      return compiler.run(statsHandle.pro.serve);
    }
    compiler.watch(
      {
        ignored: [/node_modules/, /package\.json/, /views/]
      },
      statsHandle.dev.serve
    );
  },
  async kill() {
    shell.exec(`taskkill /f /t /im electron-template.exe`);
  },
  async openApp() {
    const appPath = `${path.join(__dirname, '../node_modules/.bin/electron')} . --inspect`;
    const appProcess = childProcess.exec(appPath);
    const echo = function (msg) {
      console.log(msg);
    };
    appProcess.stdout.on('data', (chunk) => {
      echo(chunk);
    });
    appProcess.stderr.on('data', (data) => {
      echo(data);
    });
    appProcess.stdout.on('error', (chunk) => {
      echo(chunk);
    });
  }
};

const openAppFunc = () => {
  if (readyViews && readyServe) {
    readyViews = false;
    readyServe = false;
    command.openApp();
  }
};
const readyViewsFunc = () => {
  readyViews = true;
  openAppFunc();
};
const readyServeFunc = () => {
  readyServe = true;
  openAppFunc();
};

argv.forEach((commandItem) => {
  if (!command[commandItem] || typeof command[commandItem] !== 'function') return;
  command[commandItem]();
});
