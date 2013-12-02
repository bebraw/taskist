#!/usr/bin/env node
var taskist = require('../');

var tasks = require('./tasks');
var config = require('./config');


main();

function main() {
    taskist(config.tasks, tasks);
}
