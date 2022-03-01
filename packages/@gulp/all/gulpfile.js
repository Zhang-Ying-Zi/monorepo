const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browser = require("browser-sync");
// const fs = require("fs");
// const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const autoprefixerConfig = {
  overrideBrowserslist: [
    "> 1%",
    "last 3 versions",
    "iOS >= 7",
    "Android >= 4.1",
    "ie >= 6",
    "Firefox >= 20",
    "Chrome >= 20",
    "Safari >=2",
    "Opera >=20",
  ],
};

gulp.task("clean", function () {
  return gulp.src("./dist/*").pipe($.clean());
});

// 合并 css,js 文件
gulp.task(
  "usemin",
  gulp.series("clean", function () {
    return gulp
      .src("src/index.html")
      .pipe($.rename("index.html"))
      .pipe(
        $.usemin({
          js: [
            $.babel({
              presets: ["@babel/env"],
            }),
            $.uglify(),
            $.rev(),
          ],
          css: [
            $.postcss([
              require("autoprefixer")(autoprefixerConfig),
              require("postcss-nested"),
            ]),
            $.minifyCss(),
            $.rev(),
          ],
        })
      )
      .pipe(gulp.dest("dist"));
  })
);

gulp.task("babel", () =>
  gulp
    .src("src/**/*.js")
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("scss", () => {
  const sass = require("gulp-sass")(require("sass"));

  return gulp
    .src("src/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("src"));
});

gulp.task(
  "css",
  gulp.series("scss", function () {
    return gulp
      .src("src/**/*.css")
      .pipe($.sourcemaps.init())
      .pipe(
        $.postcss([
          require("autoprefixer")(autoprefixerConfig),
          require("postcss-nested"),
        ])
      )
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest("dist"));
  })
);

// Starts a test server, which you can view at http://localhost:3000
gulp.task("server", function () {
  browser.init({
    open: true,
    notify: true,
    reloadOnRestart: true,
    injectChanges: true,
    server: {
      baseDir: "./dist",
    },
  });
});

// gulp.series()
// gulp.parallel()
gulp.task(
  "default",
  gulp.series(["clean", "scss", "usemin", "server"], function (done) {
    done();
  })
);
