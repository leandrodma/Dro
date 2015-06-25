
var gulp =        require('gulp');
var gutil =       require('gulp-util');
var concat =      require('gulp-concat');
var connect =     require('gulp-connect');
var notify =      require('gulp-notify');
var cache =       require('gulp-cache');
var minifyCss =   require('gulp-minify-css');
var sourcemaps =  require('gulp-sourcemaps');
var sass =        require('gulp-sass');
var jshint =      require('gulp-jshint');
var uglify =      require('gulp-uglify');

gulp.task('default',['sass','javascript', 'watch', 'connectOnDev']);

// Task para assistir mudanças em arquivos
gulp.task('watch', function(){
  gulp.watch('app/*.html',function(){
    gulp.src('app/index.html')
    .pipe(connect.reload());
  });
  gulp.watch(['app/src/scss/**/*.scss'],['sass']);
  gulp.watch(['app/src/vendor/bootstrap/**/*.scss'],['bootstrap']);
  gulp.watch('app/src/scripts/*.js',['javascript']);
});

// Task para compilar o sass, concatenar os estilos num único arquivo, minificar e criar o sourcemap
gulp.task('sass', function(){
    gulp.src('app/src/scss/application.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function (error) {
          return "Erro ao compilar o Sass: " + error.message;
        }))
        .pipe(concat('application.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write()) // Cria o sourcemap intrínseco ao application
        .pipe(gulp.dest('app/public/css'))
        .pipe(connect.reload());
});

// Task para compilar o boostrap

gulp.task('bootstrap', function(){
    gulp.src('app/src/vendor/bootstrap/stylesheets/bootstrap.scss')
        .pipe(sass())
        .on("error", notify.onError(function (error) {
          return "Erro ao compilar o Bootstrap: " + error.message;
        }))
        .pipe(concat('bootstrap.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('app/public/vendor/bootstrap/css'))
        .pipe(connect.reload());
});


// Task que verifica erros, compila e minifica o JavaScript
gulp.task('javascript', function(){
  gulp.src('app/src/scripts/*.js')
  .pipe(sourcemaps.init())
  .pipe(notify(function (file) {

      if (file.jshint.success) {
        return 'Scripts validados e comprimidos.'; //Don't show something if success
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      // return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .pipe(uglify({
      mangle: false
    }))
    .on('error', gutil.log)
    .pipe(concat('application.min.js'))
    .pipe(sourcemaps.write()) // Cria o sourcemap intrínseco ao application
    .pipe(gulp.dest('app/public/scripts'))
    .pipe(connect.reload());
});

gulp.task( 'connectOnDev', function() {
  connect.server({
    root: 'app',
    port: 8080,
    livereload: true
  });
});
