# 说明

>前段时间在学习webpack，最近第一次在实际项目中使用webpack,感觉使用webpack效率提高了不少，所以想把自己的学习心得会分享给大家

>这是我简单的配置的一个webpack例子，里面包含了一些webpack的简单配置

>如果您觉得对您有帮助，您可以点右上角 "Star" 支持一下 谢谢，如果发现有什么问题，欢迎指出

## 示例运行
``` bash
# 克隆到本地
git clone https://github.com/zhangxinmei/webpack.git

# 进入文件夹
cd webpak-demo
# 安装依赖
npm install

# 开启本地服务器
npm run dev

```
## webpack的简单配置
其实关于webpack，最有效的办法就是跟着官方文档一步步配置
[webpack官方文档](https://doc.webpack-china.org/)

### 新建目录
首先我们需要新建目录用于存放我们的，目录结构大家可以自己定，下面是我的目录结构

```bash
│  package-lock.json
│  package.json
│  postcss.config.js //postcss配置
│  webpack.common.js //通用配置
│  webpack.dev.js  //开发环境配置
│  webpack.prod.js //生产环境配置
│  yarn.lock
│
└─src
    │  index.html //主页面文件
    │
    ├─css
    │      style.less  //样式文件
    │
    └─js
            index.js  //入口文件
```
### 安装

首先我们需要安装webpack，可以全局安装，也可以本地安装

```bash
npm install -g webpack //全局安装

npm install --save-dev webpack //本地安装
```
### 加载CSS
为了从 能JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader，并在通用配置中进行相应规则的配置
```bash
npm install --save-dev style-loader css-loader
```
### 设定 HtmlWebpackPlugin


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
