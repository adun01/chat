const path = require('path'),
    webpack = require('webpack');

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
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        }]
    },
    devtool: "source-map",
    context: __dirname,
    //ignored: /node_modules/,
    watch: true
}, function (error, stats) {
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