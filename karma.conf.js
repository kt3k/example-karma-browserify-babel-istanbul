module.exports = function(config) {
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
        ['babelify', { presets: ['es2016'], plugins: ['istanbul'] }]
      ]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: { type: 'lcov' },
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
  })
}
