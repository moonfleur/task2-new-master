var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    //uglify      = require('gulp-uglifyjs'),
    del         = require('del');
    //imageMin    = require('');

gulp.task('sass', function () {
    return gulp.src('sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
});

// gulp.task('scripts', function () {
//     return gulp.src('test.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./js'))
// });

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    })
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('watch', gulp.series('browser-sync', 'sass'), function () {
    gulp.watch('sass/**/*.sass', gulp.series('sass'));
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('*.js', browserSync.reload);
});

gulp.task('build', gulp.series( 'sass'), function () {
    var buildFonts = gulp.src('/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildHtml = gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});