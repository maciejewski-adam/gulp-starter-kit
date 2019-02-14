# gulp-starter-kit

## Environment configuration:
1. Install Node.js + npm
2. Install gulp globaly: `npm install gulp --global`


## How to use

### 1. Clone repo
```
git clone https://github.com/maciejewski-adam/gulp-starter-kit.git
```

### 2. Go inside cloned repo
```
cd gulp-starter-kit
```

### 3. Install all dependencies (make sure nodejs with npm is installed on your machine)
```
npm install
```

### 4. Run default gulp task
```
gulp
```

Default task will: 
- generate styles.css file from .scss files (file location: src/css/styles.css)
- generate minified styles.css file as additional file (file location: src/dist/min-css/styles.css)
- generate sprite.css file (file location: src/css/sprite.css)
- generate minified sprite.css file as additional file (file location: src/dist/min-css/sptire.css)
- generate sprite.png file (file location: src/dist/sprite/sprite.png)

Images that need to be added to sprite, please add to location: src/img/sprite


## Additional tasks

### 1. CSS minification and concatenation
```
gulp min-concat-css
```

### 2. JS minification
```
gulp min-js
```

### 3. JS minification and concatenation
```
gulp min-concat-js
```


## List of npm packages used

- gulp
- gulp-sass
- gulp-sourcemaps
- gulp-autoprefixer
- gulp-clean-css
- gulp-uglify
- gulp-concat
- merge-stream
- gulp.spritesmith
