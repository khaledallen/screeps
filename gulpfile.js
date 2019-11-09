const { watch } = require('gulp');
var screeps = require('gulp-screeps');
const credentials = require('credentials.js');

gulp.task('screeps', function() {
  gulp.src('*.js')
    .pipe(screeps(credentials));
});


function defaultTask(cb) {
    console.log('change detected');
  cb();
}


exports.default = function() {
    watch('*.js', defaultTask);
}

