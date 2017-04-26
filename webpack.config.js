const path = require('path');

module.exports = {
    entry: './module/app.js',
    output: {
        filename: './public/javascripts/bundle.js'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'module')
        ],
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    devtool: "source-map",
    context: __dirname,
    watch: true
};