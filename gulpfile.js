const gulp = require( 'gulp' );
const imagemin = require( 'gulp-imagemin' );
const minifyCss = require( 'gulp-minify-css' );
const concat = require( 'gulp-concat' );
const autoPrefixer = require( 'gulp-autoprefixer' );
const browserSync = require( 'browser-sync' );
const webserver = require( 'gulp-webserver' );
const sass = require('gulp-sass');
const rename = require('gulp-rename');



/*
========================
VARIABLES
========================
*/
const dirDev = "public/assets/img/**/*";
const dirProd = "build/assets/img/";
const dirDevCss = ['public/vendor/bootstrap/css/bootstrap.css','public/css/heroic-features.css',];
const dirProdCss = "build/assets/css";
const scssFiles = './src/scss/style.scss';



/*
========================
TASKS
========================
*/

gulp.task( 'img-min', function() {
    return gulp.src( dirDev )
        .pipe(imagemin())
        .pipe(gulp.dest(dirProd));
} );
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});


gulp.task('sassdev', function() {
    return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task('css-min', function() {
    return gulp.src(dirDevCss)
        .pipe(concat('main.bootstrap.min.css'))
        .pipe(autoPrefixer('last 1 version'))
        .pipe(minifyCss())
        .pipe(gulp.dest(dirProdCss))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('webserver', function() {
    gulp.src('app')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: true
      }));
  });

gulp.task('watch', function() {
    return gulp.watch(dirDevCss, gulp.series('css-min'));
});

gulp.task('default', gulp.parallel('browserSync', 'img-min', 'css-min', 'webserver', 'watch'), function() { });