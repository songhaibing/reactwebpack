const path =require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin =require('extract-text-webpack-plugin');
module.exports= {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: 'js/app.js',
    },
    devServer: {
        host:'10.200.8.172',
        compress:true,
        port:1714
   },
    //src/page这个目录赋值给page
    resolve:{
        alias:{
            page: path.resolve(__dirname, 'src/page'),
        }
    },
    module: {
        rules: [
            //react语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            //处理css
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",use:"css-loader"
                })

            },
            //sass文件处理
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:['css-loader','sass-loader']
                })

            },
            //图片处理
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            //字体图标配置
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'//以./src/index.html模版打包
        }),
        new ExtractTextPlugin('css/[name].css'),//该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象;
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        })
    ]
}