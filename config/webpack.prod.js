/**
 * @Author: forguo
 * @Date: 2022/3/23 15:45
 * @Description: webpack.prod
 */
const path = require('path');
// 友好的错误提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    mode: 'production',
    // use source-map for production:
    devtool: 'source-map',
    stats: {
        all: false,
        hash: true,
        colors: true,
        timings: true,
        version: true,
        builtAt: true,
        assets: true,
    },
    plugins:[
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Build Complete`],
            }
        }),
    ],
}
