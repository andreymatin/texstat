(() => {

  'use strict';

  const {
    src,
    dest,
    parallel,
    series,
    watch
  } = require('gulp');

  /**
   * Modules
   */
  const sass = require('gulp-sass');
  const connect = require('gulp-connect');
  const open = require('gulp-open');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const sourcemaps = require('gulp-sourcemaps');
  const bump = require('gulp-bump');
  const rollup = require('rollup').rollup;
  const babel = require('rollup-plugin-babel');


  /**
   * Config
   */
  const cfg = {
    src: {
      css: './src/css/',
      sass: './src/scss/**/*.scss',
      js: './src/js/**/*.js',
      jsBuild: './src/build/js/**/*.js',
      img: './src/images/**/*.png',
      html: './src/*.html',
    },
    server: {
      host: '0.0.0.0',
      root: './src/',
      port: 3000,
      src: './src/index.html',
      uri: 'http://localhost:3000/',
    }
  }


  /**
   * JS Bundler
   */
  function roll() {
    return rollup({
      input: './src/js/app.js',
      plugins: [
        babel()
      ]
    }).then(bundle => {
      return bundle.write({
        file: './src/build/js/app.js',
        format: 'iife',
        name: 'library',
        sourcemap: true
      });
    });
  }



  /**
   * Patching
   */
  function bumper() {
    return src('./package.json')
      .pipe(bump())
      .pipe(dest('./'));
  }


  /**
   * Styles
   */
  function styles() {
    return src(cfg.src.sass)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass({
        outputStyle: 'expanded',
        //outputStyle: 'compressed',
        errLogToConsole: false
      }))
      .on('error', notify.onError())
      .pipe(sourcemaps.write('./'))
      .pipe(dest(cfg.src.css))
      .pipe(connect.reload());
  }




  /**
   * Scripts
   */
  function scripts() {
    return src(cfg.src.jsBuild)
      .pipe(connect.reload());
  }



  /**
   * Images
   */
  function images() {
    return src(cfg.src.img)
      .pipe(connect.reload());
  }


  /**
   * HTML
   */
  function html() {
    return src(cfg.src.html)
      .pipe(connect.reload())
  }

  /**
   * Create Local Web Server
   */
  function openServer() {
    connect.server({
      host: cfg.server.host,
      root: cfg.server.root,
      port: cfg.server.port,
      livereload: true
    });
  }

  /**
   * Open Default Browser
   */
  function openBrowser() {
    return src(cfg.server.src)
      .pipe(plumber())
      .pipe(open({
        uri: cfg.server.uri
      }));
  }

  /**
   * Watcher
   */
  function watcher() {
    watch(cfg.src.sass, styles);
    watch(cfg.src.jsBuild, scripts);
    watch(cfg.src.img, images);
    watch(cfg.src.html, html);
    watch(cfg.src.js, roll);
  }

  exports.default = parallel(roll, styles, scripts, images, html, openServer, openBrowser, watcher);
  exports.build = series(styles, scripts, images, html, bumper);
})();