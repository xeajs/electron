import { joinRoot } from './helper/utils'

export const Define = {
  dist: {
    dir: joinRoot('dist'),
    main: joinRoot('dist/main'),
    preload: joinRoot('dist/preload'),
    render: joinRoot('dist/render'),
  },
  output: joinRoot('output'),
  entryPoints: {
    main: joinRoot('src/main/index.ts'),
    preload: joinRoot('src/preload/index.ts'),
    render: joinRoot('src/render/index.ts'),
  },
}
