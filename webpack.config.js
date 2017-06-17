const path = require('path'),
    webpack = require('webpack'),
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
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    module: {
        rules: [
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
    devtool: "source-map",
    context: __dirname,
    //ignored: /node_modules/,
    watch: true
}, (error, stats) => {
    if (error) {
        console.log(error);
    } else {
        console.log({
            hash: stats.hash,
            startTime: stats.startTime,
            endTime: stats.endTime
        });
    }
});