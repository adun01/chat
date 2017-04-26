const gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    glob = ['./frontend/scss/*.scss', '!./frontend/scss/_*.scss'];

gulp.task('main', function () {
    return gulp.src(glob)
        .pipe(plumber(function (error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest('./public/stylesheets/'))
        .on('end', function () {
            console.log('files changed!');
        });
});

gulp.task('default', function () {
    return watch(['./frontend/scss/*.scss'], function () {
        gulp.start('main');
    });
});
function errrr(err) {
    console.log(err);
    gulp.start('main');
}

gulp.start('default');