const path = require('path');

module.exports = {
    /**
     * 入口文件，如果不做任何配置默认入口是src/index.js
     */
    entry: [path.resolve(__dirname, 'src/app.js')],

    // 多入口需要如下键值对形式
    // entry: {
    //     app: path.resolve(__dirname, 'src/app.js'),
    //     app2: path.resolve(__dirname, 'src/app2.js'),
    // },

    /*--------------*/
    /**
     * 出口文件
     */
    output: {
        // 打包后的路径
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名，默认打包出来是main.js
        filename: 'js/app.js',
    }
}
