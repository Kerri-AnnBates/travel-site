var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

//Task to delete original sprites folder with svg file from the images and temp folder.
gulp.task('beginClean', () => {
  return del['./app/temp/sprite', './app/assets/images/sprites'];
});

//Task to create a new updated sprites folder with new svg file.
gulp.task('createSprite', ['beginClean'], function(){
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

//Task to copy sprites folder to the images folder.
gulp.task('copySpriteGraphic', ['createSprite'], () => {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

//Task to copy the sprites.css to the styles modules folder to stay organized. And rename it.
gulp.task('copySpriteCSS', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

//Task to delete sprites folder from temp folder.
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
  return del('./app/temp/sprite');
});

//Task to run all the above tasks at once.
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteCSS', 'copySpriteGraphic', 'endClean']);
