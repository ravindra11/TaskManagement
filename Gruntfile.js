var moment = require('moment-timezone');
module.exports = function (grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'mochawesome',
                    reporterOptions: {
                        reportDir: 'tests/reports',
                        reportName: 'report',
                        reportTitle: moment.tz('America/Vancouver').format('MMM, DD YYYY hh:mm A'),
                        reportFilename: 'report',
                        clearRequireCache: true,
                        enableCode: false
                    }
                },
                src: [
                    './tests/autoComplete.js', '!./tests/reports/assets/*.{js, css}'
                ]
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('grunt-mocha-test', ['mochaTest:test']);
};