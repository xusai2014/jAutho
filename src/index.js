#!/usr/bin/env node
import yargs from 'yargs';
import * as generate from './modules/generate';
import * as preRender from './modules/preRender';
import * as serve from './modules/serve';
import * as dockerContainer from './modules/dockerContainer';
import * as zip from './modules/zip';

yargs
    .command(generate)
    .command(preRender)
    .command(serve)
    .command(dockerContainer)
    .command(zip)
    .help()
    .argv;
