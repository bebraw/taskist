'use strict';

var async = require('async');
var is = require('annois');
var schedule = require('node-schedule');


module.exports = function(config, tasks, extra) {
    var foundTasks = initialize(config, tasks);
    var unusedTasks = findUnused(Object.keys(tasks), Object.keys(foundTasks));

    if(unusedTasks.length) {
        console.log('Failed to find configuration for `' + unusedTasks.join('`, `') + '`!');
    }

    if(extra && extra.instant) {
        var eachName = extra.series? 'eachSeries': 'each';
        var done = is.fn(extra.instant)? extra.instant: noop;

        async[eachName](Object.keys(foundTasks), function(name, cb) {
            var task = config[name];

            if(!is.object(task) || !('instant' in task) || task.instant) {
                foundTasks[name](cb);
            }
            else {
                cb();
            }
        }, done);
    }
};

function initialize(config, tasks) {
    var foundTasks = {};

    Object.keys(config).forEach(function(name) {
        var pattern = config[name];

        if(name in tasks) {
            var task = tasks[name];

            schedule.scheduleJob(pattern, task.bind(null, noop));

            foundTasks[name] = task;
        }
        else {
            console.warn('Failed to find `' + name + '` amongst tasks!');
        }
    });

    return foundTasks;
}

function findUnused(tasks, foundTasks) {
    return tasks.filter(function(name) {
        return foundTasks.indexOf(name) === -1;
    });
}

function noop() {}

