module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'client/wrap/start.txt', 
          'client/send.js', 
          'client/core.js', 
          'client/libraries/*.js', 
          'client/wrap/end.txt'
        ],
        dest: 'app/public/shaker-dev.js'
      }
    },
    min: {
      dist: {
        src: ['app/public/shaker-dev.js'],
        dest: 'app/public/shaker.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min');
  
};