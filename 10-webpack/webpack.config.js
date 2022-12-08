// webpack配置文件
// 语法用commonjs，因为构建工具基于nodejs平台运行。
const {resolve} = require('path');
const HtmlWbpackPlugin=require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
//设置nodejs环境变量
process.env.NODE_ENV ='development';

module.exports={
// 入口
entry:'./src/index.js',
// 输出
output:{
    filename:'main.js',
    path: resolve(__dirname,'build'),     // 输出路径，__dirname绝对路径 拼接形式
},
// loader配置
module:{
    rules:[
        // 详细loader配置，不同文件必须配置不同loader
        {
            test: /\.css$/,    // 匹配哪些文件
            // 使用多个loader进行处理用use，use数组中loader执行顺序，从右到左，依次执行
            use: [
                // 创建style标签，将js中的样式资源插入进去，添加到head中生效
                // 'style-loader',
                miniCssExtractPlugin.loader,   //取代style-loader
                // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                'css-loader',
                // css兼容性处理：postcss-loader   postcss-preset-env
               'postcss-loader',    
            ]
        },
        {
            test: /\.less$/,
            use:[
                'style-loader', 'css-loader',   'less-loader'  //将less文件 编译成css文件
            ]
        },
        {  //默认处理不了HTML上的图片
            // 处理图片资源
            test:/\.(jpg|png|gif)$/,
            // 下载url-loader file-loader
            loader: 'url-loader',
            options:{
                limit: 8*1024,   //图片大小小于8kb，就会被base64处理（减少请求次数；图片体积会变大）
                // url-loader默认用es6模块解析，html-loader是commonjs
                esModule: false,
                // 给图片重命名，取图片的hash的前十位，取文件源扩展名
                name: '[hash:10].[ext]',
                outputPath: 'imgs'   //图片输出到目标文件夹
            },
            type:'javascript/auto'
        },
        {
            test: /\.html$/,
            loader:'html-loader'   //处理html的img文件，引入img，就能被url-loader处理
        }
    ]
},
// plugins配置
plugins: [
    // HtmlWbpackPlugin()功能：默认创建空html，自动引入打包输出的所有资源（js/css）
    new HtmlWbpackPlugin({
        template: './src/index.html'  //复制html文件，并自动打包引入打包输出的所有资源
    }),
    new miniCssExtractPlugin({
        filename: 'css/built.css'   //对输出的css文件重命名
    })
],
// 模式    development/production
mode: 'development',

// 开发服务器devServer，下载npm i webpack-dev-server -D
//启动指令：npx webpack-dev-server
devServer:{
    // contentBase: resolve(__dirname,'build'),  新版本不支持，会报错
    static: {
        directory: resolve(__dirname, 'build'),   //项目构建后的路径
      },
    compress: true,     //启动gzip压缩
    port: 3000 ,    //端口号
    open: true    //自动打开浏览器
}


}


