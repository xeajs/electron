import esbuild, { BuildOptions } from 'esbuild'

export async function serve(buildOptions: BuildOptions) {
  try {
    const ctx = await esbuild.context(buildOptions)
    await ctx.watch()
  } catch (e: any) {
    console.error(`error when starting esbuild dev server:\n${e.stack}`)
    process.exit(1)
  }
}
export function build(buildOptions: BuildOptions) {
  esbuild.build(buildOptions).catch((e) => {
    console.error(`error during esbuild build:\n${e.stack}`)
    process.exit(1)
  })
}
