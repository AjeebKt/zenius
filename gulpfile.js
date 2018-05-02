var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();


var project = 'test',
    DEST = 'test/build/';


gulp.task('sass', () =>
  sass(project+'/src/sass/*.scss', {
      // style: 'nested',
      // lineNumbers: true
    })
    .on('error', sass.logError)
    .pipe(autoprefixer('last 8 versions', '> 5%'))
    // .pipe(concat(filename))
    .pipe(gulp.dest(DEST+'/css'))
    // .pipe(browserSync.stream());
);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './'+project+'/build/index.html'
    });
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('./'+project+'/build/*.html', browserSync.reload);
  // Watch .scss files
  gulp.watch('./'+project+'/src/sass/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);