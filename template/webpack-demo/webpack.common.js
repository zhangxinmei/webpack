const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: [
            // 'webpack/hot/only-dev-server',
            // `webpack-dev-server/client?http://0.0.0.0:8088/`,
            './src/main.js'
        ]
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        },
        {
            test: /\.(gif|jpg|jpeg|png|svg)$/,//图片各类格式
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,//图片大小
                        name: '[name]-aaa.[ext]'//图片名称规则
                    }
                }
            ]
        },
        {
            test: /(\.scss|\.css)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                },
                {
                    loader: 'postcss-loader'
                }
                ]
            })
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "index.html")
        }),
        new ExtractTextPlugin("[name].[hash:10].css"),
    ]
}