// Generated on 2014-05-06 using generator-angular 0.7.1

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing dist times
  require('time-grunt')(grunt);

  var userConfig = require('./build.config.js');

  // Define the configuration for all the tasks
  var taskConfig = {

    pkg: grunt.file.readJSON("package.json"),

    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> owen0215@gmail.com\n' +
        ' */\n'
    },

    /**
     * Clean the serve/dist directories
     */
    clean: {
      serve: '<%= serve_dir %>',
      dist: '<%= dist_dir %>',
      build: '<%= build_dir %>'
    },

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and javascripts into
     * `serve_dir`, and then to copy the assets to `dist_dir`.
     */
    copy: {

      pre_vendor: {
        files: [{
          src: [
            '<%= vendor_files.js %>',
            '<%= vendor_files.css %>',
            '<%= vendor_files.assets %>'
          ],
          dest: '<%= src_dir %>/vendor/',
          expand: true,
          cwd: 'bower_components'
        }]
      },

      dist_assets: {
        files: [{
          src: ['**'],
          dest: '<%= dist_dir %>/assets/',
          expand: true,
          cwd: 'src/assets'
        }]
      },

      dist_vendor: {
        files: [{
          src: ['**'],
          dest: '<%= dist_dir %>/vendor/',
          expand: true,
          cwd: 'src/vendor'
        }]
      },

      dist_app_js: {
        files: [{
          src: ['<%= app_files.js.main %>', '<%= app_files.js.common %>', '<%= app_files.js.app %>'],
          dest: '<%= build_dir %>/',
          cwd: '.',
          expand: true
        }]
      }
    },

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {

      /**
       * The `dist_app_js` target is the concatenation of our application source
       * code and all specified vendor source code into a single file.
       */
      dist_app_js: {
        options: {
          banner: '<%= meta.banner %>',
          separator: '\n;'
        },
        src: [
          '<%= build_dir %>/src/app/**/*.js',
        ],
        dest: '<%= dist_dir %>/scripts/app.js'
      },

      dist_common_js: {
        options: {
          banner: '<%= meta.banner %>',
          separator: '\n;'
        },
        src: [
          '<%= build_dir %>/src/common/**/*.js',
        ],
        dest: '<%= dist_dir %>/scripts/common.js'
      }

    },


    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dist_dir %>/scripts',
          src: '*.js',
          dest: '<%= dist_dir %>/scripts'
        }]
      }
    },

    /**
     * Minify the sources!
     */
    uglify: {
      dist: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.dist_app_js.dest %>': '<%= concat.dist_app_js.dest %>',
          '<%= concat.dist_common_js.dest %>': '<%= concat.dist_common_js.dest %>',
          '<%= dist_dir %>/scripts/templates-app.js': '<%= html2js.app.dest %>',
          '<%= dist_dir %>/scripts/templates-common.js': '<%= html2js.common.dest %>'
        }
      }
    },

    /**
     * Recess is used to compile the less files into css files
     */
    recess: {

      serve_app: {
        src: ['<%= app_files.less.main %>', '<%= app_files.less.app %>'],
        dest: '<%= serve_dir %>/styles/app.css',
        options: {
          separator: '\n;',
          compile: true
        }
      },

      serve_common: {
        src: ['<%= app_files.less.common %>'],
        dest: '<%= serve_dir %>/styles/common.css',
        options: {
          banner: '<%= meta.banner %>',
          separator: '\n;',
          compile: true,
          compress: true
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      serve: {
        files: [{
          expand: true,
          cwd: '<%= serve_dir %>/styles/',
          src: '*.css',
          dest: '<%= serve_dir %>/styles/'
        }]
      },
    },

    cssmin: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          '<%= dist_dir %>/styles/app.css': '<%= recess.serve_app.dest %>',
          '<%= dist_dir %>/styles/common.css': '<%= recess.serve_common.dest %>'
        }
      }
    },

    jshint: {
      src: [
        '<%= app_files.js.main %>',
        '<%= app_files.js.app %>',
        '<%= app_files.js.common %>'
      ],
      test: [],
      gruntfile: [
        'Gruntfile.js'
      ],
      globals: {}
    },

    /**
     * HTML2JS is a Grunt plugin that takes all of your template files and
     * places them into JavaScript files as strings that are added to
     * AngularJS's template cache. This means that the templates too become
     * part of the initial payload as one JavaScript file. Neat!
     */
    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src'
        },
        src: ['<%= app_files.tpl.app %>'],
        dest: '<%= serve_dir %>/scripts/templates-app.js'
      },

      /**
       * These are the templates from `src/common`.
       */
      common: {
        options: {
          base: 'src'
        },
        src: ['<%= app_files.tpl.common %>'],
        dest: '<%= serve_dir %>/scripts/templates-common.js'
      }
    },

    /**
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      serve: {
        dir: '<%= serve_dir %>',
        src: [
          '<%= serve_dir %>/styles/*.css',
          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',
          '<%= src_dir %>/app/**/*.js'
        ]
      },

      /**
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      dist: {
        dir: '<%= dist_dir %>',
        src: [
          '<%= dist_dir %>/styles/*.css',
          '<%= dist_dir %>/scripts/*.js'
        ]
      }
    },


    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: "http://localhost:9000",
          base: [
            '<%= src_dir %>',
            '<%= serve_dir %>'
          ]
        }
      },
      preview: {
        options: {
          port: 9001,
          open: "http://localhost:9001",
          base: [
            '<%= dist_dir %>',
          ],
          keepalive: true
        }
      },

      test: {
        options: {
          port: 9002,
          base: [
            '<%= serve_dir %>',
            'test',
            '<%= src_dir %>'
          ]
        }
      }
    },



    /**
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed
     * tasks when they do. This just saves us from having to type "grunt" into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave "grunt watch" running in a background terminal. Set it
     * and forget it, as Ron Popeil used to tell us.
     *
     * But we don't need the same thing to happen for all the files.
     */
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= src_dir %>/**'
        ]
      },

      //check js errors
      jshint: {
        files: [
          '<%= app_files.js.main %>',
          '<%= app_files.js.common %>',
          '<%= app_files.js.app %>'
        ],
        tasks: ['jshint']
      },

      //compile update less to css
      less: {
        files: ['<%= app_files.less.common%>', '<%= app_files.less.main%>', '<%= app_files.less.app%>'],
        tasks: ['recess:serve_app']
      },

      tpl: {
        files: [
          '<%= app_files.tpl.app %>',
          '<%= app_files.tpl.common %>'
        ],
        tasks: ['html2js']
      }
    }

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


  grunt.registerTask('prepare', [
    'clean:serve',
    'recess',
    'autoprefixer',
    'jshint',
    'html2js',
    'index:serve'
  ]);

  grunt.registerTask('serve', [
    'prepare',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'prepare',
    'clean:dist',
    'copy:dist_vendor',
    'copy:dist_assets',
    'copy:dist_app_js',
    'cssmin',
    'concat:dist_app_js',
    'concat:dist_common_js',
    'ngmin',
    'uglify:dist',
    'index:dist',
    'clean:build'
  ]);

  grunt.registerTask('preview', [
    'build',
    'connect:preview'
  ]);

  grunt.registerTask('test', [
    'clean:serve',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'uglify:dist',
    'karma'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'dist'
  ]);



  /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS(files) {
    return files.filter(function(file) {
      return file.match(/\.js$/) && !file.match(/\.test\.js$/);
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS(files) {
    return files.filter(function(file) {
      return file.match(/\.css$/);
    });
  }

  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function() {
    var dirRE = new RegExp('^(' + grunt.config('src_dir') + '|' + grunt.config('serve_dir') + '|' + grunt.config('dist_dir')+ '|' + grunt.config('build_dir') + ')\/', 'g');
    var jsFiles = filterForJS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.tpl.html', this.data.dir + '/index.html', {
      process: function(contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });
};