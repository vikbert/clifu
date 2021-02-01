#!/usr/bin/env node
'use strict';
const meow = require('meow');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const logUpdate = require('log-update');
const logSymbols = require('log-symbols');
const { exec } = require('child_process');

const listenPorts = () => {
	exec('lsof -n -i4TCP | grep 127.0.0.1', (error, stdout, stderr) => {
		console.log(stdout);
	});
};
const helpInfo = [
	chalk.yellow('Usage'),
	'  $ speedor',
	' ',
	chalk.yellow('Options'),
	'   --help     Display help for the given command.',
].join('\n');

const cli = meow(helpInfo, {
	flags: {
		json: {
			type: 'boolean',
			alias: 'j',
		},
		bytes: {
			type: 'boolean',
			alias: 'b',
		},
		verbose: {
			type: 'boolean',
			alias: 'v',
		},
	},
});

updateNotifier({ pkg: cli.pkg }).notify();

const logError = (error) => {
	if (cli.flags.json) {
		console.error(JSON.stringify({ error }));
	} else {
		console.error(logSymbols.error, error);
	}
};

var cliArgs = process.argv.slice(2);
switch (cliArgs[0]) {
	case 'ports':
		listenPorts();
		break;
	case 'wlan':
		console.log(cliArgs[1], 'is really cool.');
		break;
	default:
		console.log(chalk.red('Sorry, that is not something I know how to do.\n'));
		console.log(helpInfo);
}
