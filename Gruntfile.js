module.exports = function (grunt) {

  /*
    * connect      ���[�J���T�[�o�𗧂Ă�
    * compass      sass�̃R���p�C���p�ɓ����Ă�
    * watch        html�Ascss�Ajs�ɕύX������ƃu���E�U���I�[�g�����[�h����
    * autoprefixer css�C�������^�C�~���O�ő��点��
                   compass�Ɠ����ɑ���C���[�W�ŁA�R���p�X�œf���o����css��Ώۂɂ��Ă��̂܂܏㏑��������
  */
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
 
  grunt.initConfig({
  
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          //open: true,
          base: '.'
        }
      }
    },
    
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'img',
          javascriptsDir: 'js',
          outputStyle: 'expanded',
          relativeAssets: true,
          noLineComments: true,
          debugInfo: false
        }
      }
    },
    
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'Explorer >= 8', 'android 2.3']
      },
      files: {
        expand: true,
        flatten: true,
        src: 'css/**/*.css',
        dest: 'css/'
      }
    },
    
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      html: {
        files: '**/*.html'
      },
      css: {
        files: [ 'scss/**/*.scss' ],
        tasks: [ 'compass', 'autoprefixer' ]
      }
    }
    
  });
  
  grunt.registerTask('default', [ 'connect', 'watch' ]);
 
};