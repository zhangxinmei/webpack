# webpack
webpack的简单配置
###### webpack.common.js的配置
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: [
            './src/js/index.js'  //主要入口文件
        ]
    },
    output: {
        //输出以后的文件
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /(\.less|\.css)$/,
                use: ExtractTextPlugin.extract({  //ExtractTextPlugin用于分离出css文件
                     fallback: "style-loader",
                    use: [{
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html")
        }),
        new ExtractTextPlugin("[name].[hash:10].css"), //哈希值用于处理缓存问题
    ]
}

```
######  webpack.dev.js的配置
```js
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
        port: '8086',
        contentBase: path.join(__dirname, "./src"),
        hot: false,
        noInfo: true,
        inline: true,
        stats: { colors: true },
        historyApiFallback: true
    }
});
```
######  webpack.prod.js的配置
```js
const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});
```
