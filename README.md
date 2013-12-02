[![build status](https://secure.travis-ci.org/bebraw/taskist.png)](http://travis-ci.org/bebraw/taskist)
# taskist - Glues your project configuration and tasks together

`taskist` provides a simple and safe way to glue your project configuration and tasks together. It uses [node-schedule](https://npmjs.org/package/node-schedule) internally. The basic idea is simple. Consider the example below (see also `demo/`):

* index.js - Project main
* config.js - Project configuration
* tasks/ - Project tasks
* tasks/index.js - Task aggregator (use [require-dir](https://npmjs.org/package/require-dir)) or similar if you like
* tasks/demo.js - Just a demo task

File contents:

index.js:
```js
var taskist = require('taskist');

var tasks = require('./tasks');
var config = require('./config');


main();

function main() {
    // initialize and start tasks here
    taskist(config.tasks, tasks);
}
```

config.js:
```js
module.exports = {
    tasks: {
        demo: {second: 30} // trigger twice per minute
    }
};
```

tasks/index.js:
```js
module.exports = require('require-dir')('.');
```

tasks/demo.js:
```js
module.exports = function() {
    console.log('demo');
};
```

`taskist` simply glues your tasks and configuration together and begins to run your tasks. That's it! In case you misspell a task at your configuration or forget to invoke some task, `taskist` will kindly remind you about it. This way you can be sure the right tasks get run.

## License

`taskist` is available under MIT. See LICENSE for more details.

