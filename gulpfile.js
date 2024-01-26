"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");
const comments = require("gulp-header-comment");
const plumber = require('gulp-plumber');
const through = require('through2');


var path = {
  src: {
    html: "source/*.html",
    blog: "source/blog/*.html",
    files: "source/files/*.pdf",
    others: "source/*.+(php|ico|png)",
    htminc: "source/partials/**/*.htm",
    incdir: "source/partials/",
    plugins: "source/plugins/**/*.*",
    js: "source/js/*.js",
    scss: "source/scss/**/*.scss",
    images: "source/images/**/*.+(png|jpg|gif|svg)",
  },
  build: {
    dirBuild: "theme/",
    dirDev: "theme/",
  },
};

// HTML
gulp.task("html:build", function () {
  return gulp
    .src(path.src.html)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('Error in plugin "' + err.plugin + '": ' + err.message);
        this.emit('end');
      }
    }))
    .pipe(through.obj(function (file, enc, cb) {
      this.push(file);
      cb();
    }, function (cb) {
      if (this._transformState.writechunk) {
        console.log('Processing file:', this._transformState.writechunk.relative);
      }
      cb();
    }))
    .pipe(fileinclude({
      basepath: path.src.incdir,
    }))
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(bs.reload({
      stream: true,
    }));
});

// Blog
gulp.task("blog:build", function () {
  return gulp
    .src(path.src.blog)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('Error in plugin "' + err.plugin + '": ' + err.message);
        this.emit('end');
      }
    }))
    .pipe(through.obj(function (file, enc, cb) {
      this.push(file);
      cb();
    }, function (cb) {
      if (this._transformState.writechunk) {
        console.log('Processing file:', this._transformState.writechunk.relative);
      }
      cb();
    }))
    .pipe(fileinclude({
      basepath: path.src.incdir,
    }))
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(bs.reload({
      stream: true,
    }));
});

// SCSS
gulp.task("scss:build", function () {
  return gulp
    .src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest(path.build.dirDev + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Javascript
gulp.task("js:build", function () {
  return gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.build.dirDev + "js/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Images
gulp.task("images:build", function () {
  return gulp
    .src(path.src.images)
    .pipe(gulp.dest(path.build.dirDev + "images/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Plugins
gulp.task("plugins:build", function () {
  return gulp
    .src(path.src.plugins)
    .pipe(gulp.dest(path.build.dirDev + "plugins/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Other files like favicon, php, sourcele-icon on root directory
gulp.task("others:build", function () {
  return gulp.src(path.src.others).pipe(gulp.dest(path.build.dirDev));
});

// PDF Files
gulp.task("files:build", function () {
    return gulp
        .src(path.src.files)
        .pipe(gulp.dest(path.build.dirDev + "files/"))
        .pipe(
            bs.reload({
                stream: true,
            })
        );
});

// Clean Build Folder
gulp.task("clean", function (cb) {
  rimraf("./theme", cb);
});

// Watch Task
gulp.task("watch:build", function () {
  gulp.watch(path.src.html, gulp.series("html:build"));
  gulp.watch(path.src.blog, gulp.series("blog:build"));
  gulp.watch(path.src.htminc, gulp.series("html:build"));
  gulp.watch(path.src.scss, gulp.series("scss:build"));
  gulp.watch(path.src.js, gulp.series("js:build"));
  gulp.watch(path.src.images, gulp.series("images:build"));
  gulp.watch(path.src.plugins, gulp.series("plugins:build"));
  gulp.watch(path.src.files, gulp.series("files:build"));
});

// Dev Task
gulp.task(
  "default",
  gulp.series(
    "clean",
    "html:build",
    "blog:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "others:build",
    "files:build",
    gulp.parallel("watch:build", function () {
      bs.init({
        server: {
          baseDir: path.build.dirDev,
        },
      });
    })
  )
);

// Build Task
gulp.task(
  "build",
  gulp.series(
    "html:build",
    "blog:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "others:build",
    "files:build"
  )
);
