// const fs = require("fs");
const gulp = require("gulp");

const plugins = require("gulp-load-plugins")();
// const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

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
          js: [plugins.uglify(), plugins.rev()],
          css: [plugins.minifyCss(), plugins.rev()],
        })
      )
      .pipe(gulp.dest("dist"));
  })
);

gulp.task("babel", () =>
  gulp
    .src("src/framework7.v4.1.1.min.js")
    .pipe(
      plugins.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"))
);

// gulp.series()
// gulp.parallel()
gulp.task(
  "default",
  gulp.series("clean", function () {})
);
