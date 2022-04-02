/**
 * @Author: forguo
 * @Date: 2022/3/25 14:32
 * @Description: main.js
 */
import _ from 'lodash'
import axios from 'axios'

let App = function () {
    this.data = [];
    this.init();
}

let unused = 'unused';

require.ensure(['./async1'], () => {

}, 'async1');

App.prototype = {
    init: function () {
        document.getElementById('app').innerHTML = 'Webpack App';
        console.log('app created');
        console.log(_.isArray(this.data));

        axios({
            url: 'https://forguo.cn/api/common/wechat/sdk'
        }).then(res => {

        });
    }
}

export {
    App,
    unused,
};
