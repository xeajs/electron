#!/usr/bin/env tsx

import cac from 'cac';
import { mainBuild, mainStartServer } from './serve/main';
import { renderBuild, renderStartServer } from './serve/render';
import { emptyOutDir, exec } from './share/utils';

process.env.host = 'true';

const cli = cac('-_-');

cli
  .command('[serve]', 'start dev server')
  .option('--mode', 'dev,prod')
  .action(async () => {
    await emptyOutDir();
    await mainStartServer();
    renderStartServer();
    exec(`nodemon -w dist -w package.json --exec electron . --inspect`);
  });
cli
  .command('build', 'build for production')
  .option('--mode', 'dev,prod')
  .action(async () => {
    await emptyOutDir();
    await mainBuild();
    await renderBuild();
  });

cli.help();
cli.version('v3');
cli.parse();
