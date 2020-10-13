'use strict';

const readline = require('readline');
const os = require('os');
require('colors');

class XeaCompiledNote {
  constructor(options) {
    this.options = Object.assign(
      {
        /** 是否清空控制台 */
        clearConsole: true,
        /** 显示的名称 */
        name: 'React Service',
        /** 显示的端口 */
        port: 3000,
        /** 有警告是否显示 */
        warnings: true,
        /** 有错误是否显示 */
        errors: false
      },
      options
    );
    this.plugin = { name: 'XeaCompiledNote' };
  }

  doneFunc(stats) {
    if (this.options.clearConsole) {
      this.clearConsole();
    }
    const hasErrors = stats.hasErrors();
    const hasWarnings = stats.hasWarnings();
    /** 如果有错误不要显示 */
    if (!this.options.errors && hasErrors) {
      return;
    }
    /** 如果有警告不要显示 */
    if (!this.options.warnings && hasWarnings) {
      return;
    }
    this.outputNote(stats);
  }
  invalidFunc() {
    this.clearConsole();
  }
  clearConsole() {
    if (process.stdout.isTTY) {
      const blank = '\n'.repeat(process.stdout.rows);
      console.log(blank);
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearScreenDown(process.stdout);
    }
  }
  outputNote(stats) {
    const Note = {
      title: ` NOTE `.bgGreen.black,
      note: `Compiled successfully in ${this.getCompileTime(stats)}ms`.green
    };
    const Types = {
      title: ` DONE `.bgGreen.black + ` - Types:  `.green,
      note: `       Compiled ${this.options.name.red}`.green
    };
    const Local = {
      title: ` DONE `.bgGreen.black + ` - Local:  `.green,
      note: `       http://localhost:${this.options.port}/`.green
    };
    const Network = {
      title: ` DONE `.bgGreen.black + ` - Network:`.green,
      note: `       http://${this.getAddress()}:${this.options.port}/`.green
    };

    console.log(Note.title, Note.note);
    console.log('\r\n');
    console.log(Types.title, Types.note);
    console.log(Local.title, Local.note);
    console.log(Network.title, Network.note);
    console.log('\r\n');
  }
  isMultiStats(stats) {
    return stats.stats;
  }
  getAddress() {
    const interfaces = os.networkInterfaces();
    let address = '127.0.0.1';
    for (let devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return (address = alias.address);
        }
      }
    }
    return address;
  }
  getCompileTime(stats) {
    if (this.isMultiStats(stats)) {
      return stats.stats.reduce((time, stats) => Math.max(time, this.getCompileTime(stats)), 0);
    }
    return stats.endTime - stats.startTime;
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.done.tap(this.plugin, (stats) => this.doneFunc(stats));
      compiler.hooks.invalid.tap(this.plugin, () => this.invalidFunc());
    } else {
      compiler.plugin('done', (stats) => this.doneFunc(stats));
      compiler.plugin('invalid', () => this.invalidFunc());
    }
  }
}

module.exports = XeaCompiledNote;
