// Karma configuration
// Generated on Thu Jan 05 2017 11:21:09 GMT+0900 (KST)

module.exports = function(config) {
  var karmaConfig = {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      './test/**/*.spec.js'
    ],

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher'
    ],

    // list of files to exclude
    exclude: [
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /(\.js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              // plugins: ['rewire']
            }
          }
        ]
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/**/*.spec.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  if(config.coverage) {
    karmaConfig.reporters.push("coverage");
    karmaConfig.coverageReporter = {
        type: 'html',
        dir: 'coverage'
    };
    karmaConfig.browsers.push("PhantomJS");
    //  {
    //     test: /(\.js)$/,
    //     exclude: /(test\/unit|node_modules)/,
    //     enforce: "pre",
    //     loader: 'isparta-loader',
    //     options: {
    //       embedSource: true,
    //       noAutoWrap: true,
    //       babel: {
    //           // plugins: ['rewire']
    //       }
    //     }
    //   },
  } else {
    karmaConfig.browsers.push("Chrome");
  }

  config.set(karmaConfig);
}
