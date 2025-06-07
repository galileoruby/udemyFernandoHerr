module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'), // Usamos chrome launcher aunque sea Edge
      require('karma-edge-launcher'), // Usamos chrome launcher aunque sea Edge
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    customLaunchers: {
      CustomEdge: {
        base: 'Chrome',
        flags: [
          '--no-default-browser-check',
          '--no-first-run',
          '--no-sandbox',
          '--disable-gpu',
          '--user-data-dir=C:/tmp/edge-test-profile',
          '--profile-directory=KarmaTestProfile',
          '--remote-debugging-port=9222',
          '--disable-extensions',
          '--disable-sync' // Prevent syncing with your account
        ],
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        // executablePath: 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
      },
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
      }

    },
    browsers: ['CustomEdge'],
    reporters: ['progress', 'kjhtml'],
    port: 1300,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    restartOnFileChange: true,
     
    singleRun: false,
    // logLevel: config.LOG_DEBUG
  });


};
