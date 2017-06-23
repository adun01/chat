const path = require('path'),
    webpack = require('webpack'),
    colors = require('colors/safe'),
    AsyncAwaitPlugin = require('webpack-async-await');

webpack({
    entry: './frontend/js/app.js',
    output: {
        filename: './public/javascripts/bundle.js'
    },
    resolve: {
        modules: [
            'bower_components',
            'node_modules',
            'public',
            path.resolve(__dirname, 'frontend/js/')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                    emitWarning: true,
                    quiet: true,
                    fix: true,
                    failOnWarning: true,
                    failOnError: true,
                    outputReport: {
                        filePath: 'checkstyle.xml',
                        formatter: require('eslint/lib/formatters/checkstyle')
                    },
                    parserOptions: {
                        ecmaVersion: 8,
                        sourceType: 'module',
                        env: {
                            es6: true,
                            browser: true,
                            node: true
                        }
                    },
                    rules: {
                        semi: 2
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }],
            }
        ]
    },
    devtool: 'source-map',
    context: __dirname,
    //ignored: /node_modules/,
    watch: true
}, (error, stats) => {
    if (error) {
        console.log('\x1b[33m%s\x1b[0m', error.message);
    } else {
        stats.compilation.errors.forEach((error) => {
            console.log('\x1b[33m%s\x1b[0m', error.message);
            console.info('-------------------------------');
        });

        stats.compilation.warnings.forEach((warning) => {
            console.log('\x1b[33m%s\x1b[0m', warning.message);
            console.info('-------------------------------');
        });

        console.info('\x1b[33m%s\x1b[0m', 'INFO');
        console.log('\x1b[36m%s\x1b[0m', 'hash ' + stats.hash);
        console.log('\x1b[36m%s\x1b[0m', 'time: ' + (stats.endTime - stats.startTime) / 1000 + 's');

    }
});