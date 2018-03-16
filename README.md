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
其实关于webpack，最有效的办法就是跟着官方文档一步步配置，我就是跟着官方文档一步步配置的，文档写的非常好，跟着一步步就能够配置出来了
[webpack官方文档](https://doc.webpack-china.org/)

### 新建目录
首先我们需要新建目录用于存放我们的项目，目录结构大家可以自己定，下面是我的目录结构

```bash
|____package-lock.json
|____package.json
|____postcss.config.js
|____src
| |____css
| | |____style.less // 样式文件
| |____index.html // 主页面
| |____js
| | |____index.js  // 入口文件
|____webpack.common.js  //通用配置
|____webpack.dev.js  // 开发环境配置
|____webpack.prod.js // 生产环境配置
|____yarn.lock

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
如果你的项目使用sass或者less编写，那么就要安装sass,sass-loader和less,less-loader，并进行相应的配置

### 设定 HtmlWebpackPlugin

为了在打包时候使index.html文件能够自动引入可能文件名会改变的入口文件，就要使用HtmlWebpackPlugin，并在通用配置中对其进行配置，通常需要配置filename和template两个参数，具体参数可参考[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
* filename：你的html主页面名称，默认为index.html
* template：你的html主页面的路径
```bash
npm install --save-dev html-webpack-plugin
```
### 清理 /dist 文件夹
如果你的css和js文件设置了哈希值，那么在每次打包的时候，webpack都会重新生成一个带哈希值的文件，这样可能我们不能马上看出自己最近一次修改的文件，因此这时候clean-webpack-plugin 就可以解决这个问题，它会清理dist文件夹，打包后只剩下最近一次修改的文件

```bash
npm install clean-webpack-plugin --save-dev
```
### 使用 source map
source map可以将编译后的代码映射回原始源代码，方便我们检查错误。我们只需在webpack.dev.js文件里面配置

```bash
devtool: 'inline-source-map'
```
### 使用 webpack-dev-server
webpack-dev-server可以帮助我们在每次代码发生变化后自动编译代码：

```bash
npm install --save-dev webpack-dev-server

//配置
devServer: {
     contentBase: './dist'
   },
```

###### webpack.common.js的配置
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {  //入口
        app: [
            './src/js/index.js'
        ]
    },
    output: {  //出口
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
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
            template: path.resolve(__dirname, "src/index.html")
        }),
        new ExtractTextPlugin("[name].[hash:10].css"),
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
