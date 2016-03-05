'use strict'
//
var project = {
  name: 'atltransit',
  url: 'http://test.atlb.us',
}
var repo = {
  url: 'git@github.com:atlregional/atltransit.org.git'
}
var less = true; // less or sass = false
var paths = {
  source: './',
  asset: './assets',
  build: './build',
  vendor: './vendor',
  pub: './_site',
  bower: './bower_components',
  imgSrc: './assets/source_images'

}
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build --watch'
}
var replaceFileName = {
  css: [ project.name + '.css', project.name + '.min.css' ],
  js: [ project.name + '.js', project.name + '.min.js' ]
}
var cssMetaType = function () {
  var type
  less ? type = 'less' : type = 'sass'
  return type
}
var autoprefixerBrowsers = [
  'ie >= 8',
  'ie_mob >= 8',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]
var uncssIgnoreClass = [
  /.navdrawer-container.open/,
  /.app-bar.open/
]
// Include Gulp & Tools We'll Use
var gulp = require('gulp')
var gulpFilter = require('gulp-filter')
// var bower = require('gulp-bower-files')
var $ = require('gulp-load-plugins')()
var del = require('del')
var runSequence = require('run-sequence')
var rename = require('gulp-rename')
var mainBowerFiles = require('main-bower-files')
var browserSync = require('browser-sync')
var childProcess = require('child_process')
var pagespeed = require('psi')
var reload = browserSync.reload
var imageResize = require('gulp-image-resize')

gulp.task('image-resize', function () {
  gulp.src(paths.imgSrc + '/cards/*')
    .pipe(imageResize({
      width: 600,
      height: 300,
      crop: true,
      upscale: false
    }))
    .pipe(gulp.dest(paths.asset + '/images'))
})

// Build the Jekyll Site
gulp.task('jekyll', function (done) {
  browserSync.notify(messages.jekyllBuild)
  return childProcess.spawn('jekyll', ['build'], {
    stdio: 'inherit'
  })
    .on('close', done)
})

// Optimize Images
gulp.task('images', function () {
  return gulp.src(paths.asset + '/images/**/*')
    .pipe($.plumber())
    .pipe($.newer(paths.build + '/images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.build + '/images'))
    .pipe($.size({
      title: 'images'
    }))
})

// JavaScript
gulp.task('js', function () {
  return gulp.src(paths.asset + '/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat(project.name + '.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build + '/js'))
})
// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(paths.build + '/js/**/*.js')
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
})

// less or sass
gulp.task(cssMetaType(), function () {
  return gulp.src(paths.asset + '/' + cssMetaType() + '/**/*')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.if(less, $.less().on('error', console.error.bind(console))))
    .pipe($.if(!less, $.sass().on('error', console.error.bind(console))))
    .pipe($.autoprefixer(autoprefixerBrowsers))
    // .pipe($.minifyCss())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build + '/css'))
    .pipe($.size({ title: cssMetaType() }))
})

// Compiles LESS > CSS 
gulp.task('build-less', function () {
  return gulp.src('./assets/less/atl.less')
    .pipe($.less())
    .pipe(gulp.dest('./build/css'))
})

// bootstrap less prep
gulp.task('bootstrap:prepareLess', ['bower-override'], function () {
  return gulp.src(paths.asset + '/less/bootstrap/variables.less')
    .pipe(gulp.dest(paths.vendor + '/bootstrap/less'))
})
// gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function () {
//   return gulp.src(paths.vendor + '/bootstrap/less/bootstrap.less')
//     .pipe($.less())
//     .pipe(gulp.dest(paths.vendor + '/bootstrap/dist/css'))
// })

gulp.task('font-awesome:prepareLess', ['bower-override'], function () {
  return gulp.src(paths.asset + '/less/font-awesome/variables.less')
    .pipe(gulp.dest(paths.vendor + '/font-awesome/less'))
})
// gulp.task('font-awesome:compileLess', ['font-awesome:prepareLess'], function () {
//   return gulp.src(paths.vendor + '/font-awesome/less/font-awesome.less')
//     .pipe($.less())
//     .pipe(gulp.dest(paths.vendor + '/font-awesome/css'))
// })

// Lint CSS
gulp.task('csslint', function () {
  return gulp.src(paths.build + '/css/**/*.css')
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.csslint())
    .pipe($.csslint.reporter())
    .pipe($.if(!browserSync.active, $.csslint.reporter('fail')))
})

// minify
gulp.task('minify', function () {
  var assets = $.useref.assets()
  return gulp.src(paths.pub + '/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    .pipe($.if('*.css', $.uncss({
      html: '*.html',
      ignore: uncssIgnoreClass
    })))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.replace(replaceFileName.css))
    .pipe($.replace(replaceFileName.js))
    .pipe($.if('*.html', $.minifyHtml()))
    .pipe(gulp.dest(paths.pub))
    .pipe($.size({ title: 'minify' }))
})

// clean
// ========================
gulp.task('clean', function (cb) {
  runSequence('clean-build', 'clean-bower', cb)
})
gulp.task('clean-build', del.bind(null, [paths.build, paths.pub]))
gulp.task('clean-bower', del.bind(null, [paths.bower, paths.vendor]))

// bower install
// ========================
gulp.task('install', function (cb) {
  runSequence('clean-bower', 'bower-install', 'bower-override', cb)
})
gulp.task('bower-install', function () { return $.bower();})
gulp.task('bower-override', function () {
  return gulp.src(mainBowerFiles(), { base: paths.bower })
    .pipe(gulp.dest(paths.vendor))
})

//
// concat *.js to `vendor.js`
// and *.css to `vendor.css`
// rename fonts to `fonts/*.*`
//
// Define paths variables
gulp.task('bower-concat', ['bootstrap:prepareLess', 'font-awesome:prepareLess'], function () {
  var jsFilter = gulpFilter('**/*.js', {restore: true})
  var cssFilter = gulpFilter(['**/*.css'], {restore: true})

  return gulp.src(mainBowerFiles(), { base: paths.bower })

    // js
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    // .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.vendor))
    .pipe(jsFilter.restore)

    // css
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.css'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.vendor))
    .pipe(cssFilter.restore)

    .pipe(rename(function (path) {
      if (~path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
    .pipe(gulp.dest(paths.vendor))

})

// fonts
gulp.task('fonts', function () {
  return gulp.src(paths.vendor + '/fonts/*')
    .pipe(gulp.dest(paths.build + '/fonts'))
})

// build
// ========================
gulp.task('build', function (cb) {
  runSequence(
    'clean-build',
    ['build-less', 'js', 'images', 'fonts'],
    // 'jshint',
    'csslint',
    'jekyll',
    // 'bower-install',
    // 'watch',
    // 'minify',
    cb
  )
})

// watch
// ========================
gulp.task('watch', function () {
  // Watch .scss files
  gulp.watch('assets/css/**/*.css', ['jekyll', reload])
  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js'])
  // Watch .html files and posts
  gulp.watch(['index.html', '_config.yml', '_data/*.yml', '/images/**/*', '_includes/*.html', '_agencies/*.md', '_guide/*.md', '_fares/*.md', '_layouts/*.html', '_includes/*.md', 'pages/**/*.md', '_includes/*.markdown', '_posts/*.md', 'plan/*'], ['jekyll'])

  gulp.watch([paths.source + '/**/*.html'], ['jekyll', reload])
  gulp.watch([paths.asset + '/' + cssMetaType() + '/**/*'], [cssMetaType(), 'jekyll', reload])
  gulp.watch([paths.asset + '/js/**/*.js', paths.asset + '/js/*.js'],
    // ['jshint'],
    ['js', 'jekyll', reload])
  gulp.watch([paths.asset + '/images/**/*.png', paths.asset + '/images/**/*.jpg', paths.asset + '/images/**/*.svg', paths.asset + '/images/**/*.jpeg'], reload)
})

// default
// ========================
gulp.task('default', ['build', 'watch'], function () {
  browserSync({
    notify: true,
    logPrefix: project.name,
    https: false,
    server: paths.pub
  })
})

// minify
// ========================
gulp.task('min', function (cb) { runSequence('minify', cb); })

// Run PageSpeed Insights
// http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
// ========================
gulp.task('pagespeed', pagespeed.bind(null, { url: project.url, strategy: 'mobile' }))

// deploy
// ========================
gulp.task('deploy', function () {
  return gulp.src(paths.pub)
    .pipe($.deploy({
      remoteUrl: repo.url,
      branch: 'gh-pages'
    }))
})

// sftp-deploy
// ========================
gulp.task('sftp-deploy', function () {
  return gulp.src(paths.pub)
    .pipe($.sftp({
      host: project.url,
      auth: 'keyMain'
    }))
})

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
