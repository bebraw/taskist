var schedule = require('node-schedule');


module.exports = function(config, tasks) {
    var foundTasks = initialize(config, tasks);
    var unusedTasks = findUnused(Object.keys(tasks), foundTasks);

    if(unusedTasks.length) {
        console.log('Failed to find configuration for `' + unusedTasks.join('`, `') + '`!');
    }
};

function initialize(config, tasks) {
    var foundTasks = [];

    Object.keys(config).forEach(function(name) {
        var pattern = config[name];

        if(name in tasks) {
            var task = tasks[name];

            schedule.scheduleJob(pattern, task);

            foundTasks.push(name);
        }
        else {
            console.warn('Failed to find `' + name + '` amongst tasks!');
        }
    });

    return foundTasks;
}

function findUnused(tasks, foundTasks) {
    return tasks.filter(function(name) {
        return foundTasks.indexOf(name) == -1;
    });
}
