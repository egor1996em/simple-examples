var gulp = require('gulp');
var clean = require('gulp-clean');
var gulpsync = require('gulp-sync')(gulp);
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-sass');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

const sourcePaths = {
    htmlFolder : "./src/**/*.html",
    sassFolder : "./src/scss/**/*.scss",
    jsFolder : "./src/js/**/*.js"
};

const destPaths = {
    htmlFolder : "./build",
    sassFolder : "./build/style",
    jsFolder : "./build/js"
};

gulp.task("default", gulpsync.sync(["build", "watch"]));

gulp.task("build", gulpsync.sync(["clean:all", "copy:html", "sass", "build:js:dev"]));

gulp.task("build:prod", gulpsync.sync(["clean:all","copy:html", "sass", "build:js:prod"]));

gulp.task("sass",() => {
    return gulp.src(sourcePaths.sassFolder)
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(gulp.dest(destPaths.sassFolder));
});

gulp.task("build:js:dev",() => {
    return gulp.src(sourcePaths.jsFolder)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destPaths.jsFolder));
});

gulp.task("build:js:prod", () =>{
    return gulp.src(sourcePaths.jsFolder)
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(destPaths.jsFolder));
});

gulp.task("copy:html",() => {
    return gulp.src(sourcePaths.htmlFolder)
        .pipe(gulp.dest(destPaths.htmlFolder));
});

gulp.task("clean:sass", ()=> {
    return gulp.src(destPaths.sassFolder,{read: false})
        .pipe(clean());
});

gulp.task("clean:js", ()=> {
    return gulp.src(destPaths.jsFolder,{read: false})
        .pipe(clean());
});

gulp.task("clean:all", ["clean:sass","clean:js"]);

gulp.task("watch", () => {
    gulp.watch(sourcePaths.sassFolder, ["sass"]);

    gulp.watch(sourcePaths.jsFolder, ["build:js:dev"]);
});