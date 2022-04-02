/**
 * @Author: forguo
 * @Date: 2022/4/2 16:17
 * @Description: async.js
 */

let async1 = function () {
    return new Promise((resolve => {
        resolve('async1')
    }));
}

(async function () {
    await async1();
})();
