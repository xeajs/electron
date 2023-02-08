import { build, BuildOptions, context } from 'esbuild'
import appConfig from '../../app.config'
import { joinRoot } from '../share/utils'

export const ESBUILD_OPTIONS: BuildOptions = {
  absWorkingDir: process.cwd(),
  entryPoints: [appConfig.ENTRY],
  outfile: joinRoot(appConfig.OUTDIR, 'server.js'),
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
}

export async function mainStartServer() {
  try {
    const ctx = await context(ESBUILD_OPTIONS)
    await ctx.watch()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
export async function mainBuild() {
  try {
    await build(ESBUILD_OPTIONS)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
