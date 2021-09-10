const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    watch: true,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 9000,
        compress: true,
    },
}