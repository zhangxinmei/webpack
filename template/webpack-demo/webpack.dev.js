const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: '5656',
        contentBase: path.join(__dirname, "./src"),
        hot: false,
        noInfo: true,
        inline: true,
        stats: { colors: true },
        historyApiFallback: true
    }
});