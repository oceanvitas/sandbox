var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cached = require('gulp-cached'),
    postcss = require('gulp-postcss'),
    watch = require('gulp-watch'),
    runSequence = require('gulp-run-sequence'),
    autoprefixer = require('autoprefixer'),
    csswring = require('csswring'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    bs = require('browser-sync');

var src = './src';
var dist = './dist';
var paths = {
      js: src + '/**/*.js',
      css: src + '/**/*.css',
      less: src + '/**/*.less',
      images: src + '/**/*.+(png|jpg|gif)',
      html: src + '/**/*.html'
    };
var AUTOPREFIXER_BROWSERS = ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6'];
var processors = [
      autoprefixer(AUTOPREFIXER_BROWSERS),
      csswring({
        preserveHacks: true,
        removeAllComments: true
      })
    ];

var onError = function (err) {
      notify.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        sound: 'Beep'
      })(err);
    };

//html
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(cached('html'))
        .pipe(gulp.dest(dist));
});

//js
gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(cached('js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist));
});

//images，包括图片压缩
gulp.task('images', function () {
    gulp.src(paths.images)
        .pipe(cached('images'))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist));
});

//css 
gulp.task('css', function () {
    gulp.src(paths.css)
        .pipe(cached('css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest(dist))
});

//less
gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(cached('less'))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist))
});

//clean 
gulp.task('clean', function () {
    return gulp.src(dist, {read: false})
        .pipe(clean());
});


/**
 * bs
 */
// Start the server
gulp.task('bs', function () {
  var baseUrlLoc, files;
    files = [paths.html, paths.images, paths.css, paths.js, paths.less];
  bs.init(files, {
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
});

gulp.task('sync', ['bs'], function () {

  watch(paths.html, function () {
    runSequence('html', bs.reload);
  });

  watch(paths.js, function () {
    runSequence('js', bs.reload);
  });

  watch(paths.less, function () {
    runSequence('less', bs.reload);
  });

  watch(paths.css, function () {
    runSequence('css', bs.reload);
  });

  watch(paths.images, function () {
    runSequence('images', bs.reload);
  });

});

//clean
gulp.task('clean', function() {
    runSequence(['clean']);
});

//develop
gulp.task('dev', function() {
    runSequence(['html', 'js', 'less', 'css', 'images', 'sync']);
});
