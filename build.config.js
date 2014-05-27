/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `dist_dir` folder is where our projects are compiled during
   * development and the `dist_dir` folder is where our app resides once it's
   * completely built, and the 'dist_dir' is what we deploy to the server.
   */

  src_dir: 'src',
  serve_dir: 'serve',
  dist_dir: 'dist',
  build_dir: '.tmp',


  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`).
   */

  app_files: {
    html: {
      index: ['src/index.tpl.html']
    },
    js: {
      main: ['src/app/app.js'],
      common: ['src/common/**/*.js','!src/common/**/*.test.js'],
      app: ['src/app/**/*.js','!src/app/**/*.test.js']
    },
    tpl: {
      common: ['src/common/**/*.tpl.html'],
      app: ['src/app/**/*.tpl.html']
    },
    less: {
      common: ['src/common/**/**.less'],
      main: ['src/less/*.less'],
      app: ['src/app/**/**.less']
    },
    assets: ['src/assets/']
  },


  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'jquery/jquery.js',
      'angular/angular.js',
      'bootstrap/dist/js/bootstrap.js',
      'angular-ui-router/release/angular-ui-router.js'
    ],
    js_ex: [
      'es5-shim/es5-shim.js',
      'json3/lib/json3.js'
    ],
    css: [
      'bootstrap/dist/css/bootstrap.css'
    ],
    assets: [
      'bootstrap/dist/fonts/**'
    ]
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'angular-mocks/angular-mocks.js'
    ]
  }


};