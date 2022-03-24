/**
 * @Author: forguo
 * @Date: 2022/3/23 13:56
 * @Description: webpack.config
 */
const path = require('path');
const chalk = require("chalk");
const webpack = require("webpack");

// merge配置合并
const { merge } = require('webpack-merge');

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Html编译
const HtmlWebpackPlugin = require('html-webpack-plugin');

// css打包提取为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 友好的进度条
const WebpackBar = require('webpackbar');

// 用于将静态文件拷贝到你的输出目录下，有时一些文件并没有适用的 loader 或者是不需要经过处理，原样复制的文件。
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { name, version } = require("../package");

// dev配置
const devConfig = require('./webpack.dev');
// prod配置
const prodConfig = require('./webpack.prod');

module.exports = (env) => {

    console.log(chalk.blue('Environment:'), chalk.yellowBright(env));
    console.log(chalk.blue('Version:'), chalk.yellowBright(version));
    const devMode = env === 'development';

    // 基本配置
    const baseConfig = {
        /**
         * 入口文件，如果不做任何配置默认入口是[src/index.js]
         */
        // entry: [path.resolve(__dirname, '../src/app.js')],

        // 多入口需要如下键值对形式
        entry: {
            app: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
        },

        /*--------------*/
        /**
         * 出口文件
         */
        output: {
            // 打包后的路径
            path: path.resolve(__dirname, '../dist'),
            // 打包后的文件名，默认打包出来是main.js
            filename: 'js/[name].[contenthash:6].js',
            publicPath: '/',
            // publicPath: 'https://cloud-app.com.cn/app/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/, // 检测js文件
                    use: {
                        loader: 'babel-loader', // 使用babel-loader
                    }
                },
                {
                    test: /\.css/,
                    use: [
                        /**
                         * MiniCssExtractPlugin提取css为一个文件，MiniCssExtractPlugin没有hdr，
                         * 所以开发使用style-loader
                         */
                        devMode ?  'style-loader' : MiniCssExtractPlugin.loader,
                        // 'style-loader', // 将css文件打包到js
                        'css-loader', // css文件处理
                    ]
                },
                {
                    test: /\.less/,
                    use: [
                        /**
                         * MiniCssExtractPlugin提取css为一个文件，MiniCssExtractPlugin没有hdr，
                         * 所以开发使用style-loader
                         */
                        devMode ?  'style-loader' : MiniCssExtractPlugin.loader,
                        // 'style-loader', // 将css文件打包到js
                        'css-loader', // css文件处理
                        'less-loader', // less编译
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                outputPath: 'img/',
                                publicPath: '../img/',
                                // 压缩之后的图片如果小于10KB，那么将直接转为Base64编码，否则通过URL的形式连接图片;
                                limit: 10 * 1024, // 默认转为Base64编码
                                name: '[name].[contenthash:6].[ext]',
                            },
                        },
                        /**
                         * loader for zip img
                         */
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4, // 1-11 越小压缩效果越好
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // 清除上次打包的代码
            new CleanWebpackPlugin(),
            // new webpack.ProgressPlugin(),
            new WebpackBar({
                name: name || 'WebPack',
                color: '#61dafb', // react 蓝
            }),
            // 默认会压缩html，
            new HtmlWebpackPlugin({
                title: 'app',
                template: path.resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
                inject: true,
                minify: false,
            }),
            // 提取css文件
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:6].css',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "../public/index.html"),
                        to: path.resolve(__dirname, "../dist")
                    },
                ],
            }),
        ]
    }

    return merge(baseConfig, {
        development: devConfig,
        production: prodConfig,
    }[env]);
}
