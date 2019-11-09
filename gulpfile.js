const { watch } = require('gulp');
var screeps = require('gulp-screeps');

gulp.task('screeps', function() {
  gulp.src('*.js')
    .pipe(screeps(options));
});


function defaultTask(cb) {
    console.log('change detected');
  cb();
}


exports.default = function() {
    watch('*.js', defaultTask);
}

