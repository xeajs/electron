const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = class {
  static resolve(type) {
    if (!['views', 'serve'].includes(type)) {
      throw new Error('参数不合法');
    }
    let pro = {
      extensions: [],
      alias: {}
    };
    switch (type) {
      case 'views':
        pro.extensions = ['.tsx', '.ts', '.js', '.json'];
        pro.alias = {
          '~': path.join(process.cwd()),
          '@views': path.join(process.cwd(), 'views')
        };
        break;
      case 'serve':
        pro.extensions = ['.ts', '.json'];
        pro.alias = {
          '~': path.join(process.cwd()),
          '@serve': path.join(process.cwd(), 'serve')
        };
        break;
    }
    return pro;
  }

  static externals(type) {
    if (!['views', 'serve'].includes(type)) {
      throw new Error('参数不合法');
    }
    let pro = [
      {
        fs: 'require("fs")',
        os: 'require("os")',
        net: 'require("net")',
        path: 'require("path")',
        child_process: 'require("child_process")'
      },
      /public\/library\/.+$/
    ];
    switch (type) {
      case 'views':
        break;
      case 'serve':
        pro.push(nodeExternals());
        break;
    }
    return pro;
  }
};
