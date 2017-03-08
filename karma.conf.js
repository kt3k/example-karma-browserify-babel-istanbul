module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'browserify'],
        files: [
            'test/*.js'
        ],
        preprocessors: {
            'test/*.js': 'babelPreprocessor',
            'test/*.js': 'browserify'
        },
        browserify: {
            debug: true,
            transform: [
                ['babelify', {presets: ['es2015'], plugins: ['istanbul']}]
            ]
        },


        reporters: ['progress', 'coverage', 'junit', 'mocha'],
        junitReporter: {
            outputDir: 'build/junit/',
            outputFile: 'test-results.xml',
        },

        mochaReporter: {
          colors: {
            success: 'blue',
            info: 'bgGreen',
            warning: 'cyan',
            error: 'bgRed'
          },
          symbols: {
            success: '+',
            info: '#',
            warning: '!',
            error: 'x'
          }
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
