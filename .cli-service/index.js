/**
 * @start 开始编译并启动开发环境客户端
 * @build 开始编译并构建打包客户端
 * @RenderProcess 开始编译 RenderProcess
 * @MainProcess 开始编译 MainProcess
 * @app   开发环境启动客户端
 */

const minimist = require('minimist');
const Command = require('./command');
const command = new Command();
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const getArgv = () => {
  let argv = minimist(process.argv.slice(2))['_'];
  /** 没有参数，帮助页面 */
  if (!argv.length) {
    argv = ['help'];
  }
  /** start */
  if (argv.includes('start')) {
    argv = ['start'];
  }
  if (argv.includes('build')) {
    argv = ['build'];
  }
  if (argv.includes('app')) {
    argv = ['app'];
  }
  if (argv.includes('kill')) {
    argv = ['kill'];
  }
  return argv;
};

for (const argvItem of getArgv()) {
  if (!command[argvItem] || typeof command[argvItem] !== 'function') {
    command.help();
    break;
  }
  command[argvItem]();
}
