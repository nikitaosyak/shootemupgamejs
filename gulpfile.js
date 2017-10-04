const gulp = require('gulp')
const connect = require('gulp-connect')

gulp.task('serve', () => {
    const fs = require('fs')
    connect.server({
        root: './build',
        port: '8000',
        livereload: true
    })
})

gulp.task('watch', () => {
    gulp.watch(['./src/**/*'], ['deploy'])
})

gulp.task('clean', () => {
    const clean = require('gulp-clean')
    return gulp.src('build/', {read: false}).pipe(clean())
})

gulp.task('pack', () => {
    const stream = require('webpack-stream')
    const webpack = require('webpack')

    const config = {
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }]
        },
        output: {
            filename: 'bundle.js'
        },
        devtool: 'source-map'
    }

    return gulp.src('src/**/*.js').pipe(stream(config, webpack)).pipe(gulp.dest('./build'))
})

gulp.task('deploy-static', ['clean'], () => {
    gulp.src(['./src/index.html']).pipe(gulp.dest('./build'))
})

gulp.task('deploy', ['clean', 'pack', 'deploy-static'], () => {
    gulp.src(['./src/**/*']).pipe(connect.reload())
})

gulp.task('default', ['serve', 'deploy', 'watch'])