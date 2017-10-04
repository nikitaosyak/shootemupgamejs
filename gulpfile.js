const gulp = require('gulp')
const connect = require('gulp-connect')

gulp.task('serve', () => {
    const fs = require('fs')
    connect.server({
        root: './src',
        port: '8000',
        livereload: true
    })
})

gulp.task('watch', () => {
    gulp.watch(['./src/**/*'], ['deploy'])
})

gulp.task('deploy', () => {
    gulp.src(['./src/**/*']).pipe(connect.reload())
})

gulp.task('default', ['serve', 'watch'])