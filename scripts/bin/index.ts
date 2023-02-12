#!/usr/bin/env tsx
import cac from 'cac'
import fs from 'fs-extra'

const cli = cac('-_-')

cli
  .command('[serve]', 'start dev server')
  .option('--mode <mode>', 'dev,prod')
  .action(async (root: string, args: { mode: 'dev' | 'prod' }) => {
    process.env.NODE_ENV = 'development'
    const utils = await import('../helper/utils')
    fs.emptyDirSync(utils.joinRoot('dist'))

    await (await import('../build')).serve(args.mode)
    utils.exec(`nodemon -w dist -w package.json --exec electron . --inspect`)
  })
cli
  .command('build', 'build for production')
  .option('--mode <mode>', 'dev,prod')
  .action(async (args: { mode: 'dev' | 'prod' }) => {
    process.env.NODE_ENV = 'production'

    const utils = await import('../helper/utils')
    fs.emptyDirSync(utils.joinRoot('dist'))
    await (await import('../build')).build(args.mode)
  })

cli.help()
cli.version('v3')
cli.parse()
