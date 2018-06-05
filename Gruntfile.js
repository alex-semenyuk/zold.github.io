module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
          'js/map.js'
        ],
        dest: 'build/<%= pkg.version %>/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      test : {
        files: ['js/**/*.js', 'sass/**/*.sass'],
        tasks: 'build'
      }
    },

    sass: {
      options: {
        outputStyle: 'expanded',
        errLogToConsole: true,
        check: true,
        sourceMap: true
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.{scss,sass}'],
          dest: 'build/<%= pkg.version %>/css',
          ext: '.min.css'
        }
      ]}
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images',
          src: [
            '*'
          ],
          dest: 'build/images',
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'html',
          src: [
            '*'
          ],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['copy', 'uglify', 'sass']);
  grunt.registerTask('build', ['copy', 'uglify', 'sass']);
};
