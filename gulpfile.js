
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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
}

function tareaDefault() {
    console.log('Soy la tarea por default')
}

exports.cssCompile = cssCompile;
exports.watchChanges = watchChanges;
exports.default = series( cssCompile, watchChanges );