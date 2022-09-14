import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
const browserSyncServer = browserSync.create();
import sourceMaps from 'gulp-sourcemaps';
import del from 'del';


// const gulp = require('gulp');
// // import gulp from 'gulp';
// import gulpSass from 'gulp-sass';
// import dartSass from 'sass';
// const sass = gulpSass(dartSass);
// // import plumber from 'gulp-plumber';
// const plumber = require('plumber');
// // import autoprefixer from 'gulp-autoprefixer';
// const autoprefixer = require('gulp-autoprefixer');
// // import browserSync from 'browser-sync';
// const browserSync = require('browser-sync').create();
// // const browserSyncServer = browserSync.create();
// // import sourceMaps from 'gulp-sourcemaps';
// const sourceMaps = require('gulp-sourcemaps');
// // import del from 'del';
// const del = require('del');


gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        // .pipe(sass())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 version'],
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSyncServer.reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSyncServer.reload({stream: true}));
});

gulp.task('css', function () {
    return gulp.src('css/**/*.css')
        .pipe(gulp.dest('build/css'))
        .pipe(browserSyncServer.reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(browserSyncServer.reload({stream: true}));
});

gulp.task('webfonts', function () {
    return gulp.src('webfonts/**')
        .pipe(gulp.dest('build/webfonts'))
        .pipe(browserSyncServer.reload({stream: true}));
});

gulp.task('img', function () {
    return gulp.src('img/**')
        .pipe(gulp.dest('build/img'))
        .pipe(browserSyncServer.reload({stream: true}));
});

gulp.task('serve', function () {
    browserSyncServer.init({
        server: "build"
    });

    gulp.watch("scss/**/*.scss", gulp.parallel('sass'));
    gulp.watch("*.html", gulp.parallel('html'));
    gulp.watch("css/**/*.css", gulp.parallel('css'));
    gulp.watch("js/**/*.js", gulp.parallel('js'));
    gulp.watch("webfonts/**", gulp.parallel('webfonts'));
    gulp.watch("img/**", gulp.parallel('img'));
});

gulp.task('copy', function () {
    return gulp.src([
        'css/**',
        '*.html',
        'js/**',
        'webfonts/**',
        'img/**'
    ], {
        base: '.'
    })
        .pipe(gulp.dest('build'));

});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'sass', function (done) {
    done();
}));