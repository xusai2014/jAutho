#!/usr/bin/env node
import yargs from 'yargs';
import * as generate from './modules/generate';

yargs.command(generate).help().argv;
