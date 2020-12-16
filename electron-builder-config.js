const PackageJson = require('./package.json');

/**
 * @安装包名称 ${productName} Setup version.xxx
 * @安装默认目录 ${productName}
 */
const productName = PackageJson.productName;
const winIcon = 'public/assets/favicon/png/favicon@5x.png';
const macIcon = 'public/assets/favicon/icons/favicon@5x.icns';

module.exports = {
  publish: [
    {
      /** 通用 */
      provider: 'generic',
      /** http://hostname:port/${name}/${os}/${arch}/${channel}/${version}/ */
      url: ''
    }
  ],
  /** 压缩为 asar */
  asar: true,
  /** asar压缩 排除目录 */
  asarUnpack: ['public'],
  /** appId */
  appId: 'com.xeajs.ecs.app',
  /** 安装包名称 ${productName} Setup version.xxx */
  productName,
  files: [
    /** 打包目录， 打包到 app.asar */
    'dist',
    'public',
    'index.js',
    'config.js',
    '!node_modules',
    '!**/*.{lib,obj,pdb,cc,h,tlog,map,exp,gypi,vcxproj,filters,cpp,c,ts}'
  ],
  nodeGypRebuild: false,
  extraFiles: [],
  win: {
    icon: winIcon,
    requestedExecutionLevel: 'asInvoker'
  },
  mac: {
    icon: macIcon
  },
  nsis: {
    /** 一键安装 */
    oneClick: false,
    /** 是否允许用户更改安装目录 */
    allowToChangeInstallationDirectory: true,
    /** 是否显示辅助安装程序的安装模式安装程序页面 */
    perMachine: true,
    /** https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c?redirectedfrom=MSDN */
    language: 2052,
    /** 注册表 url 协议 xeajs:// */
    include: 'scripts/nsis/url-protocol.nsh'
  },
  directories: {
    /** 打包安装包生成输出目录 */
    output: 'output'
  }
};
