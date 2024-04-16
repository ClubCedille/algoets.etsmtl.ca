"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");
const plumber = require('gulp-plumber');
const fs = require('fs');
const tap = require('gulp-tap');
const through = require('through2');
const frontMatter = require('gulp-front-matter');
const gulpIf = require("gulp-if");

let imagemin, imageminJpegtran, imageminPngquant, imageminSvgo, imageminGifsicle, imageminMozjpeg;

async function getMarkdown() {
  const markdown = await import('gulp-markdown');
  return markdown.default;
}

const loadPlugins = async () => {
  imagemin = (await import('gulp-imagemin')).default;
  imageminJpegtran = (await import('imagemin-jpegtran')).default;
  imageminPngquant = (await import('imagemin-pngquant')).default;
  imageminSvgo = (await import('imagemin-svgo')).default;
  imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
  imageminGifsicle = (await import('imagemin-gifsicle')).default;
};


gulp.task("load-plugins", async function () {
  await loadPlugins();
});


const path = {
  src: {
    html: "source/*.html",
    blog: "source/blog/*.md",
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

let blogItemsIncludes = '';
// Blog
gulp.task("blog:build", async function () {
  const markdown = await getMarkdown();
  return gulp.src(path.src.blog)
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(through.obj(function (file, enc, cb) {
      this.push(file);
      cb();
    }, function (cb) {
      if (this._transformState.writechunk) {
        console.log('Processing Markdown file:', this._transformState.writechunk.relative);
      }
      cb();
    }))
    .pipe(tap(function (file) {
      // Read the template
      const template = fs.readFileSync('source/blog/blog_template.html', 'utf8');

      const frontMatterData = file.frontMatter;
      const title = frontMatterData.title || 'Default Title';
      const pageName = frontMatterData['page-name'] || 'Default Page Name';
      const bgImageUrl = frontMatterData['background-image-url'] || 'default-image.jpg';
      const author = frontMatterData['author'] || 'AlgoÉTS';
      const authorTitle = frontMatterData['author-title'] || 'Club';
      const authorRole = frontMatterData['author-role'] || '.';
      const authorImg = frontMatterData['author-img'] || 'default-image.jpg';
      const facebookLink = frontMatterData['facebook-link'] || 'https://www.facebook.com/';
      const twitterLink = frontMatterData['twitter-link'] || 'https://twitter.com/';
      const linkedinLink = frontMatterData['linkedin-link'] || 'https://www.linkedin.com/';
      const date = frontMatterData['date'];
      const tagsHtml = frontMatterData['tags'].map(tag =>
        `<li class="list-inline-item"><a href="#" rel="tag">${tag}</a></li>`
      ).join('\n');
      const link = file.basename;


      blogItemsIncludes += `
      @@include('blocks/blog/blog-item.htm', {"image_src": "${bgImageUrl}", "date": "${date}", "title": "${title}", "summary": "${pageName}", "link": "${link}"})
    `;

      // Replace placeholders in the template
      const htmlContent = template
        .replace(/{{ title }}/g, title)
        .replace(/{{ page-name }}/g, pageName)
        .replace(/{{ background-image-url }}/g, bgImageUrl)
        .replace(/{{ author }}/g, author)
        .replace(/{{ author-title }}/g, authorTitle)
        .replace(/{{ author-role }}/g, authorRole)
        .replace(/{{ author-img }}/g, authorImg)
        .replace(/{{ facebook-link }}/g, facebookLink)
        .replace(/{{ twitter-link }}/g, twitterLink)
        .replace(/{{ linkedin-link }}/g, linkedinLink)
        .replace(/{{ tags }}/g, `<ul class="list-inline">${tagsHtml}</ul>`)
        .replace(/{{ content }}/g, file.contents.toString());

      // Update the file content
      file.contents = Buffer.from(htmlContent);
    }))
    .pipe(fileinclude({
      basepath: path.src.incdir,
    }))
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(bs.reload({
      stream: true,
    }));
});

// HTML
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
      // Check if the file is blog-grid.html
      if (file.basename === 'blog-grid.html') {
        // Replace {{ blogList }} with blogItemsIncludes
        let fileContent = file.contents.toString();
        fileContent = fileContent.replace('{{ blogList }}', blogItemsIncludes);
        file.contents = Buffer.from(fileContent);
      }

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

gulp.task("blog-and-html:build", gulp.series("blog:build", "html:build"));

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
function isJPEG(file) {
  return file.extname === ".jpg" || file.extname === ".jpeg";
}

function isPNG(file) {
  return file.extname === ".png";
}

function isGIF(file) {
  return file.extname === ".gif";
}

function isSVG(file) {
  return file.extname === ".svg";
}

// Task to move images without processing
gulp.task("images:move", function () {
  return gulp.src(path.src.images, { since: gulp.lastRun('images:move') })
    .pipe(gulp.dest(path.build.dirDev + "images/"))
    .pipe(bs.stream());
});

// Task to optimize images
gulp.task("images:optimize", function () {
  return gulp.src(path.build.dirDev + "images/**/*.{png,jpg,jpeg,gif,svg}", { since: gulp.lastRun('images:optimize') })
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ progressive: true, quality: 75 }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest(path.build.dirDev + "images/"))
    .pipe(bs.stream());
});

gulp.task("images:build", gulp.series("images:move", "images:optimize"));


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
  gulp.watch(path.src.blog, gulp.series("blog-and-html:build"));
  gulp.watch(path.src.htminc, gulp.series("html:build"));
  gulp.watch(path.src.scss, gulp.series("scss:build"));
  gulp.watch(path.src.js, gulp.series("js:build"));
  gulp.watch(path.src.images, gulp.series("images:build", bs.reload));
  gulp.watch(path.src.plugins, gulp.series("plugins:build"));
  gulp.watch(path.src.files, gulp.series("files:build"));
});


// Dev Task
gulp.task(
  "default",
  gulp.series(
    "load-plugins",
    "clean",
    "blog-and-html:build",
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
    "blog-and-html:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "others:build",
    "files:build"
  )
);