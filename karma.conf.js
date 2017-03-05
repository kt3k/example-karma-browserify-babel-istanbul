module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'browserify'],
        files: [
            'test/*.js'
        ],
        preprocessors: {
            'test/*.js': 'browserify'
        },
        browserify: {
            debug: true,
            transform: [
                ['babelify', {presets: ['es2016'], plugins: ['istanbul']}]
            ]
        },
        reporters: ['progress', 'coverage', 'junit'],
        junitReporter: {
            outputDir: 'build/junit/',
            outputFile: 'test-results.xml',
        },

        mochaReporter: {
            output: 'autowatch'
        },

        coverageReporter: {
            dir: 'build/coverage/',
            includeAllSources: true,
            reporters: [
                {type: 'html'},
                {type: 'text'},
                {type: 'text-summary'}
            ]
        },
        autoWatch: false,
        browsers: ['ChromeNoSandbox'],
        customLaunchers: {
            ChromeNoSandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        singleRun: true,
    })
}
