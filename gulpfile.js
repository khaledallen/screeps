const { watch } = require('gulp');

function defaultTask(cb) {
    console.log('change detected');
  cb();
}


exports.default = function() {
    watch('*.js', defaultTask);
}

