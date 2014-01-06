// supported syntax - https://npmjs.org/package/node-schedule

module.exports = {
    tasks: {
        bye: {second: 30, instant: false},
        hello: '* * * * *',
        nonexistent: '* * *'
    }
};
