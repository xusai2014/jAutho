#!/usr/bin/env node
import yargs from 'yargs';
import * as generate from './modules/generate';
import * as preRender from './modules/preRender';
import * as serve from './modules/serve';

yargs
    .command(generate)
    .command(preRender)
    .command(serve)
    .help()
    .argv;
