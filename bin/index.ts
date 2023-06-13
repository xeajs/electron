import cac from 'cac'
import { emptyDirSync } from 'fs-extra'
import { Define } from './define'
import { exec } from './helper'

const cli = cac('-_-')

cli
  .command('[serve]', 'start dev server')
  .option('--mode <mode>', 'dev,prod')
  .action(async (root: string, args: { mode: 'dev' | 'prod' }) => {
    process.env.NODE_ENV = 'development'
    emptyDirSync(Define.dist.dir)

    await (await import('./build')).serve(args.mode)
    exec(`nodemon -w dist -w package.json --exec electron . --inspect`)
  })
cli
  .command('build', 'build for production')
  .option('--mode <mode>', 'dev,prod')
  .action(async (args: { mode: 'dev' | 'prod' }) => {
    process.env.NODE_ENV = 'production'

    emptyDirSync(Define.dist.dir)
    await (await import('./build')).build(args.mode)
  })

cli.help()
cli.version('v3')
cli.parse()
