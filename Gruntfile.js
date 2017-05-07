module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      expanded: {
        options: {
          style: 'expanded',
          line_comments: false,
          line_numbers: false,
          sourcemap: 'none'
        },
        files: {
          'build/<%= pkg.name.toLowerCase() %>/style.css': 'sass/style.scss',
          'build/<%= pkg.name.toLowerCase() %>/css/editor-style.css': 'sass/editor-style.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['<%= pkg.name.toLowerCase() %>/**'], dest: 'build/'},
        ],
      },
    },
    compress: {
      build: {
        options: {
          archive: 'build/<%= pkg.name.toLowerCase() %>.zip'
        },
        files: [
          { cwd: '.',
            src: ['<%= pkg.name.toLowerCase() %>/**'],
            dest: '/'
          },
          { cwd: '.',
            src: ['build/<%= pkg.name.toLowerCase() %>/**'],
            dest: '/'
          }         
          ]
      }
    },    
    replace: {
      style: {
        options: {
          variables: {
            'author': '<%= pkg.author.name %>',
            'author_url': '<%= pkg.author.url %>',
            'version': '<%= pkg.version %>',
            'license': '<%= pkg.license.name %>',
            'license_version': '<%= pkg.license.version %>',
            'license_url': '<%= pkg.license.url %>',
            'name': '<%= pkg.name %>',
            'description': '<%= pkg.description %>',
            'homepage': '<%= pkg.homepage %>',
            'keywords': '<%= pkg.keywords.join(", ") %>'
          },
          prefix: '@@'
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['build/<%= pkg.name.toLowerCase() %>/style.css'],
          dest: 'build/<%= pkg.name.toLowerCase() %>'
        }]
      }
    },
    makepot: {
      target: {
        options: {
          cwd: '<%= pkg.name.toLowerCase() %>',
          domainPath: '/languages',
          exclude: ['bin/.*', '.git/.*', 'vendor/.*'],
          potFilename: '<%= pkg.name.toLowerCase() %>.pot',
          type: 'wp-theme',
          updateTimestamp: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wp-i18n');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  //grunt.registerTask('default', ['sass', 'copy', 'replace', 'compress' ]);
  grunt.registerTask('default', ['sass', 'replace', 'compress' ]);
};
