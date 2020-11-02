/**
 * @打包号
 * 打包build号
 */
const fs = require('fs');
const path = require('path');
const { version } = require('../../package.json');
const BuildOptionsPath = path.join(process.cwd(), '.buildVersion.json');

const InitDefaultBuildOptions = (BuildInfo) => {
  const defaultBuildInfo = JSON.stringify(BuildInfo && Object.keys(BuildInfo).length ? BuildInfo : { appVersion: version, build: 1023 }, null, 2);
  fs.writeFileSync(BuildOptionsPath, defaultBuildInfo, { encoding: 'utf-8' });
};
const UpdateDefaultBuildOptions = () => {
  if (!fs.existsSync(BuildOptionsPath)) {
    InitDefaultBuildOptions();
  }
  const BuildOptions = JSON.parse(fs.readFileSync(BuildOptionsPath, { encoding: 'utf-8' }));
  InitDefaultBuildOptions({ appVersion: version, build: BuildOptions.build + 1 });
};

UpdateDefaultBuildOptions();
