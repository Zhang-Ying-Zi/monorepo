const gulp = require("gulp");
const babel = require('gulp-babel');
 
gulp.task('default', () =>
    gulp.src('src/framework7.v4.1.1.min.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);