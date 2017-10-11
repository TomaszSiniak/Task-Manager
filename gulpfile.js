const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const sequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const babel = require('gulp-babel');

gulp.task('reload', () => {
    browserSync.reload();
});

gulp.watch('src/*.html', ['reload']);
gulp.watch('src/scss/**/*.scss', ['sass']);

gulp.task('serve', ['sass'], () => {
    browserSync({
        server: 'src'
    })
});

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream())
});

gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
    return gulp.src('src/js**/*.js')
        .pipe(babel({ presets: ["env"] }))
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(uglify().on('error', (e) => {
            console.log(e);
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img', () => {
    return gulp.src('src/images/**/*.{jpg,jpeg,gif,png}')
        .pipe(changed('dist/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});


gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(htmlReplace({
            'css': 'css/style.css',
            'js': 'js/main.js'
        }))
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('build', () => {
    sequence('clean', ['html', 'css', 'js', 'img']);
})


gulp.task('default', ['serve']);