module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Configure jshint
        jshint: {
            all: ['Gruntfile.js', '**/*.js', '!node_modules/**'],
        },

        // Configure jscs
        jscs: {
            src: '**/*.js',
        },

        // Configure express server
        express: {
            all: {
                options: {
                    script: 'app.js'
                }
            }
        },

        // Configure watch
        watch: {
            files: ['**/*.js', 'Gruntfile.js'],
            tasks: ['jshint', 'jscs', 'express'],
            options: {
                spawn: false
            }
        },

    });
    grunt.registerTask('serve', [
        'jshint',
        'jscs',
        'express',
        'watch'
    ]);
    grunt.registerTask('test', [
        'jshint:test',
        'jscs:test',
        'mochaTest:test'
    ]);
};
