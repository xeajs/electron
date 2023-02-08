import childProcess from 'child_process';
import fs from 'fs-extra';
import path from 'node:path';
import appConfig from '../../app.config';

export function joinRoot(..._path_: string[]) {
  if (!_path_ || !_path_.length) return process.cwd();
  return path.join(process.cwd(), ..._path_);
}

export function emptyOutDir() {
  fs.emptyDirSync(joinRoot(appConfig.OUTDIR));
}

export function exec(cmd: string) {
  const _childProcess = childProcess.exec(cmd);
  if (!_childProcess || !_childProcess.stdout || !_childProcess.stderr) throw new Error('start electron app error');
  _childProcess.stdout.on('data', console.info);
  _childProcess.stdout.on('error', console.info);
  _childProcess.stderr.on('data', console.info);
  _childProcess.stderr.on('error', console.info);
}
