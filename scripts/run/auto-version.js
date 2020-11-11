/**
 * @打包号
 * 打包build号
 */
const fs = require('fs-extra');
const path = require('path');
let { version } = require('../../package.json');
const BuildOptionsPath = path.join(process.cwd(), '.buildVersion.json');
version = version.split('-')[0];

const InitDefaultBuildOptions = (BuildInfo) => {
  fs.writeFileSync(BuildOptionsPath, JSON.stringify(BuildInfo, null, 2), { encoding: 'utf-8' });
};

InitDefaultBuildOptions({ appVersion: version, build: process.env.BUILD_NUMBER || -1 });
/** 清空 output 目录 */
fs.emptyDirSync(path.join(process.cwd(), 'output'));
