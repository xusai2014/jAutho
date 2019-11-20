#!/usr/bin/env node
import yargs from 'yargs';
import * as generate from './modules/generate';
import * as preRender from './modules/preRender';

yargs.command(generate).command(preRender).help().argv;
