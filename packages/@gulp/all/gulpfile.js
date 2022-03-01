// const fs = require("fs");
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
// const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const postcss = require("gulp-postcss");

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
  return gulp.src("./dist/*").pipe(plugins.clean());
});

// 合并 css,js 文件
gulp.task(
  "usemin",
  gulp.series("clean", function () {
    return gulp
      .src("src/index.html")
      .pipe(plugins.rename("index.html"))
      .pipe(
        plugins.usemin({
          js: [
            plugins.babel({
              presets: ["@babel/env"],
            }),
            plugins.uglify(),
            plugins.rev(),
          ],
          css: [
            postcss([
              require("autoprefixer")(autoprefixerConfig),
              require("postcss-nested"),
            ]),
            plugins.minifyCss(),
            plugins.rev(),
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
      plugins.babel({
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
    const sourcemaps = require("gulp-sourcemaps");

    return gulp
      .src("src/**/*.css")
      .pipe(sourcemaps.init())
      .pipe(
        postcss([
          require("autoprefixer")(autoprefixerConfig),
          require("postcss-nested"),
        ])
      )
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist"));
  })
);

// gulp.series()
// gulp.parallel()
gulp.task(
  "default",
  gulp.series(["clean", "scss", "usemin"], function (done) {
    done();
  })
);
