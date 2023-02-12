const appId = 'com.electron.xeajs'
const productName = 'xeaup'
const copyright = 'Copyright © 2023 xeajs'
const outdir = 'output'
const winIcon = 'public/favicon/icon.png'
const macIcon = 'public/favicon/icon.icns'

/** @type {import('app-builder-lib/out/configuration').Configuration} */
module.exports = {
  appId,
  productName,
  copyright,
  directories: { output: outdir },
  asar: false,
  nodeGypRebuild: false,
  extraFiles: [],
  files: ['dist', '!node_modules', '!**/*.{lib,obj,pdb,cc,h,tlog,map,exp,gypi,vcxproj,filters,cpp,c,ts}'],
  win: { icon: winIcon, requestedExecutionLevel: 'asInvoker' },
  mac: { icon: macIcon },
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
    include: 'scripts/share/url-protocol.nsh',
  },
  /** http://hostname:port/${name}/${os}/${arch}/${channel}/${version}/ */
  publish: [{ provider: 'generic', url: '' }],
}
