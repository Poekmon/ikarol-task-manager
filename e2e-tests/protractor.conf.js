//jshint strict: false
//protractor conf for e2e tests
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        '*.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:8080/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
