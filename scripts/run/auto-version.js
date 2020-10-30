const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageObject = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));
let autoVersion = packageObject.version.split('.');
autoVersion[2] = String(Number(autoVersion[2]) + 1);
fs.writeFileSync(packageJsonPath, JSON.stringify({ ...packageObject, version: autoVersion.join('.') }, null, 2), { encoding: 'utf-8' });
