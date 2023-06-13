import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck'
import react from '@vitejs/plugin-react-swc'
import { BuildOptions } from 'esbuild'
import esbuildPluginAlias from 'esbuild-plugin-alias'
import { builtinModules } from 'node:module'
import { InlineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import { Define } from '../define'
import { genEnvTypes, getEnvObject } from '../helper/env'
import { getAliasObject, joinRoot } from '../helper/utils'
import * as esbuild from './esbuild'
import * as vite from './vite'

const alias = getAliasObject()

export function getESBuildOptions(define: Record<string, string>): BuildOptions {
  return {
    absWorkingDir: joinRoot(),
    entryPoints: [Define.entryPoints.main, Define.entryPoints.preload],
    outdir: 'dist',
    write: true,
    target: ['node16'],
    platform: 'node',
    bundle: true,
    format: 'cjs',
    sourcemap: 'inline',
    metafile: true,
    color: true,
    external: ['electron'],
    logLevel: 'info',
    define: { env: JSON.stringify(define) },
    plugins: [esbuildPluginAlias(alias), typecheckPlugin()],
  }
}

export function getViteOptions(define: Record<string, string>): InlineConfig {
  return {
    root: joinRoot(),
    configFile: false,
    envFile: false,
    server: { host: true, port: +define.PORT + 1 },
    clearScreen: false,
    plugins: [react(), checker({ typescript: true })],
    define: { env: define },
    resolve: { alias },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        external: ['electron', ...builtinModules.flatMap((m) => [m, `node:${m}`])],
      },
    },
    optimizeDeps: { exclude: ['electron', ...builtinModules] },
  }
}

export async function serve(mode: string) {
  const envObject = getEnvObject(mode)
  await genEnvTypes(envObject)

  await esbuild.serve(getESBuildOptions(envObject))
  await vite.serve(getViteOptions(envObject))
}
export async function build(mode: string) {
  const envObject = getEnvObject(mode)
  await genEnvTypes(envObject)

  await esbuild.build(getESBuildOptions(envObject))
  await vite.build(getViteOptions(envObject))
}
