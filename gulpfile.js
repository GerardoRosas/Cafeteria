
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function cssCompile(done) {
    //Compilar sass 
    //pasos: 1 -identidicar archivos, 2 - compilar, 3 - guardar .css
    src('./src/scss/app.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))

    done()
}

function watchChanges() {
    watch('./src/scss/**/*.scss', cssCompile);
    watch('./src/img/**/*', images);
}

function images(done) {
    src('./src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done()
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'));
}

exports.cssCompile = cssCompile;
exports.watchChanges = watchChanges;
exports.images = images;
exports.versionWebp = versionWebp;
exports.default = series( images, versionWebp, cssCompile, watchChanges );