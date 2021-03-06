module.exports = function(grunt) {
    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);
    // Display how match time it took to build each task
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner : '/*! ************ <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd HH:MM") %>) ************ */\n',

        paths : {
            src : 'src',
            build : 'build',
            temp : 'temp'
        },

        clean: {
            scripts : [
                '<%= paths.build %>/js'
            ],
            styles : [
                '<%= paths.build %>/less',
                '<%= paths.build %>/css'
            ],
            images : [
                '<%= paths.build %>/img'
            ],
            fonts : [
                '<%= paths.build %>/fonts'
            ],
            temp : [
                '<%= paths.temp %>'
            ]
        },

        concat : {
            scripts : {
                options: {
                    banner: '<%= banner %>'
                },
                src : [
                    '<%= paths.src %>/js/Application.js',
                    '<%= paths.src %>/js/components/**/*.js',
                    '<%= paths.src %>/js/modules/**/*.js',
                    '!<%= paths.src %>/js/components/dev/**/*.js',
                    '!<%= paths.src %>/js/components/old/**/*.js'
                ],
                dest : '<%= paths.build %>/js/<%= pkg.name %>.js'
            },
            styles : {
                options: {
                    banner: '<%= banner %>'
                },
                src : [
                    '<%= paths.src %>/less/variables/**/*.less',
                    '<%= paths.src %>/less/variables.less',
                    '<%= paths.src %>/less/mixins.less',
                    '<%= paths.src %>/less/application.less',
                    '<%= paths.src %>/less/common/Font.less',
                    '<%= paths.src %>/less/common/Icons.less',
                    '<%= paths.src %>/less/common/Tags.less',
                    '<%= paths.src %>/less/common/UI.less',
                    '<%= paths.src %>/less/common/**/*.less',
                    '<%= paths.src %>/less/parts/**/*.less',
                    '<%= paths.src %>/less/layouts/**/*.less',
                    '<%= paths.src %>/less/components/**/*.less',
                    '<%= paths.src %>/less/modules/**/*.less',
                    '<%= paths.src %>/less/pages/**/*.less',
                    '!<%= paths.src %>/less/components/old/**/*.less'
                ],
                dest : '<%= paths.build %>/less/<%= pkg.name %>.less'
            }
        },

        uglify : {
            build : {
                src : ['<%= paths.build %>/js/<%= pkg.name %>.js'],
                dest : '<%= paths.build %>/js/<%= pkg.name %>.min.js'
            }
        },

        imagemin : {
            build : {
                options: {
                    optimizationLevel: 3
                },
                files : [{
                    expand : true,
                    cwd : '<%= paths.build %>/img/',
                    src : ['**/*.*'],
                    dest : '<%= paths.temp %>/img/'
                }]
            }
        },

        copy: {
            images : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.src %>/img/',
                    src : ['**/*.*'],
                    dest : '<%= paths.build %>/img/'
                }]
            },
            image_optimize : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.temp %>/img/',
                    src : ['**/*.*'],
                    dest : '<%= paths.build %>/img/'
                }]
            },
            fonts : {
                files: [{
                    expand : true,
                    cwd : '<%= paths.src %>/fonts/',
                    src : ['**/*.*', '!**/*.json'],
                    dest : '<%= paths.build %>/fonts/'
                }]
            }
        },

        watch : {
            scripts : {
                files : [
                    '<%= paths.src %>/js/**/*.js'
                ],
                tasks : ['scripts']
            },
            styles : {
                files : [
                    '<%= paths.src %>/less/**/*.less'
                ],
                tasks : ['styles']
            },
            images : {
                files : [
                    '<%= paths.src %>/img/**/*.*'
                ],
                tasks : ['images']
            },
            fonts : {
                files : [
                    '<%= paths.src %>/fonts/**/*.*',
                    '!<%= paths.src %>/fonts/**/*.json'
                ],
                tasks : ['fonts']
            }
        }
    });
    // Custom Tasks
    grunt.registerTask('default', ['scripts', 'styles', 'images', 'fonts']);
    grunt.registerTask('optimize', ['clean:temp', 'default', 'uglify', 'imagemin', 'copy:image_optimize', 'clean:temp']);

    grunt.registerTask('scripts', ['clean:scripts', 'concat:scripts']);
    grunt.registerTask('styles', ['clean:styles', 'concat:styles']);
    grunt.registerTask('images', ['clean:images', 'copy:images']);
    grunt.registerTask('fonts', ['clean:fonts', 'copy:fonts']);
};