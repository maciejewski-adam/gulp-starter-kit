var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

var config = {
    scssIn: 'src/scss/**/*.scss',
    cssFromScssOut: 'src/css',
    cssIn: 'src/css/**/*.css',
    minCssOut: 'src/dist/min-css',
    minConcatCssOut: 'src/dist/min-concat-css',
    jsIn: 'src/js/**/*.js',
    minJsOut: 'src/dist/min-js',
    minConcatJsOut: 'src/dist/min-concat-js',
    minConcatCssFileName: 'styles.css',
    minConcatJsFileName: 'scripts.js',
    spriteIn: 'src/img/sprite/**/*.{jpg,jpeg,png}',
    spriteImgOut: 'src/dist/sprite',
    spriteClassesOut: 'src/css'
};

gulp.task('sass', function() {
    return gulp.src(config.scssIn)                                              /* scss files location  */
        .pipe(sourcemaps.init())                                                /* sourcemaps initialisation */
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({                                                    /* we set here how many browsers need to be supported, for example: last 3 versions for IE is IE9, IE10 and IE11. More info about it: https://github.com/browserslist/browserslist oraz https://browserl.ist/ and tutorial in PL: https://www.youtube.com/watch?v=L2SRCgwrZH4 */
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.write())                                               /* add sourcemaps to generated styles.css file */
        .pipe(gulp.dest(config.cssFromScssOut));                                /* lotation to save generated styles.css file */
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(config.spriteIn)                                  /* input location for images to sprite */
            .pipe(spritesmith({
                imgName: 'sprite.png',                                          /* sprite file name */
                cssName: 'sprite.css'                                           /* .css/.scss file name with classes for images from sprite */
            }));

    var imgStream = spriteData.img
        .pipe(gulp.dest(config.spriteImgOut));                                  /* output location for sprite img file */
    
    var cssStream = spriteData.css
        .pipe(gulp.dest(config.spriteClassesOut));                              /* output location for .css/.scss file */
   
    return merge(imgStream, cssStream);                                         /* Return a merged stream to handle both `end` events */
});

gulp.task('min-css', function() {                                               /* generate minified file version of styles.css */
    return gulp.src(config.cssIn)                                               /* input location for .css file that need to minified */
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.minCssOut));                                     /* output location to save minified .css file */
});

gulp.task('min-concat-css', function() {                                        /* minified .css files and combine them to one .css file */
    return gulp.src(config.cssIn)                                               /* input location for .css files */
        .pipe(concat(config.minConcatCssFileName))                              /* name of minified and concatenated .css file */
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.minConcatCssOut));                               /* output location to save new .css file */
});

gulp.task('min-js', function() {                                                /* minified .js files and combine them to one .js file */
    return gulp.src(config.jsIn)                                                /* input location for .js files */          
           .pipe(uglify())
           .pipe(gulp.dest(config.minJsOut));                                   /* output location to save new .js file */
});

gulp.task('min-concat-js', function() {                                         /* minified .js files and combine them to one .js file */
    return gulp.src(config.jsIn)                                                /* input location for .js files */
           .pipe(concat(config.minConcatJsFileName))                            /* name of minified and concatenated .js file */
           .pipe(uglify())
           .pipe(gulp.dest(config.minConcatJsOut));                             /* output location to save new .js file */
});

gulp.task('watch', ['sass', 'min-css', 'sprite'], function() {                   
    gulp.watch(config.scssIn, ['sass']);                                        /* After any change in .scss files, we will generate new styles.css and minified styles.css files */
    gulp.watch(config.cssIn, ['min-css']);
    gulp.watch(config.spriteIn, ['sprite']);                                    /* After any change in img/sprite folder, we will generate new sprite file and .css file with classes for images from sprite */
});

gulp.task('default', ['watch']);