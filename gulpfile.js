var gulp = require("gulp");
const zip = require("gulp-zip").default;

function bundle() {
  return gulp
    .src([
      "**/*",
      "!node_modules/**",
      "!src/**",
      "!zip/**",
      "!bundled/**",
      "!.git/**",
      "!gulpfile.js",
      "!package.json",
      "!package-lock.json",
      "!webpack.config.js",
      "!.gitignore",
      "!.eslintrc.js",
      "!README.md",
      "!readme.md",
      "!todo.txt"
    ])
    .pipe(gulp.dest("bundled/pdf-embed-block"));
}

exports.bundle = bundle;

exports.zip = () => {
  return (
    gulp
      .src(["bundled/**"])
      .pipe(zip("pdf-embed-block.zip"))
      .pipe(gulp.dest("zip"))
  );
};
