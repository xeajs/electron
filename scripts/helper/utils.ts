import childProcess from 'child_process'
import fs from 'fs-extra'
import json5 from 'json5'
import path from 'node:path'

export function joinRoot(..._path_: string[]) {
  if (!_path_ || !_path_.length) return process.cwd()
  return path.join(process.cwd(), ..._path_)
}

export function exec(cmd: string) {
  const _childProcess = childProcess.exec(cmd)
  if (!_childProcess || !_childProcess.stdout || !_childProcess.stderr) throw new Error('start electron app error')
  _childProcess.stdout.on('data', console.info)
  _childProcess.stdout.on('error', console.info)
  _childProcess.stderr.on('data', console.info)
  _childProcess.stderr.on('error', console.info)
}

export function getAliasObject() {
  const file = joinRoot('tsconfig.json')
  const alias = {}
  if (!fs.existsSync(file)) return alias

  const tpaths: Record<string, string> = json5.parse(fs.readFileSync(file, 'utf8')).compilerOptions.paths
  if (!tpaths) return alias

  for (const tpath in tpaths) {
    const key = tpath.replace('/*', '')
    const value = tpaths[tpath][0].replace('/*', '')
    alias[key] = joinRoot(value)
  }

  return alias
}
