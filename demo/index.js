#!/usr/bin/env node
var taskist = require('../');

var tasks = require('./tasks');
var config = require('./config');


main();

function main() {
    taskist(config.tasks, tasks, {
        instant: function(err) {
            if(err) return console.error(err);

            console.log('initialized');
        }
    });
}

