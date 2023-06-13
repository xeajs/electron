import dotenv from 'dotenv'
import glob from 'fast-glob'
import fs from 'fs-extra'
import { joinRoot } from './utils'

export function getEnvObject(mode: string): Record<string, string> {
  const files = ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]
  let values: Record<string, string> = { NODE_ENV: process.env.NODE_ENV as string, MODE: mode }

  for (const fileName of files) {
    const file = joinRoot(fileName)

    if (fs.existsSync(file)) values = { ...values, ...dotenv.config({ path: file }).parsed }
  }

  return values
}

export function getEnvNames() {
  let files = glob.sync('.env.*', { cwd: joinRoot(), dot: true })
  files = files.map((f) => f.replace('.env.', '')).map((v) => `'${v}'`)
  return files.join(' | ')
}

export function genEnvTypes(envObject: Record<string, string>) {
  let envTypes = ``
  const sortEnvArray = Object.keys(envObject).sort(() => 1)
  for (const envKey of sortEnvArray) {
    switch (envKey) {
      case 'NODE_ENV':
        envTypes += `    export const ${envKey}: 'production' | 'development';\n`
        break
      case 'MODE':
        envTypes += `    export const ${envKey}: ${getEnvNames()};\n`
        break
      default:
        envTypes += `    export const ${envKey}: string;\n`
    }
  }
  const _EnvString = `/**
 * @Message 启动开发环境或者打包环境脚本时自动根据 .env* 的内容生成
 * @Note 禁止手动修改
 */
declare global {
  export namespace env {\n${envTypes}  }
}

export {};`

  if (!fs.existsSync(joinRoot('typings'))) fs.mkdirSync(joinRoot('typings'))
  fs.writeFileSync(joinRoot('typings/env.d.ts'), _EnvString, { encoding: 'utf8' })

  return envObject
}
