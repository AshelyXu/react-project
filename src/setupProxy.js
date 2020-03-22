/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-22 03:47:21
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-22 04:06:40
 */
const proxy = require('http-proxy-middleware');//模块就在react脚手架中自带 

module.exports = function(app) {
  app.use(
    '/ajax', 
    proxy({
      target: 'http://m.maoyan.com',
      changeOrigin: true,
      //pathRewrite:
    })
  );

//   app.use(
//     '/ajax2',
//     proxy({
//       target: 'http://m2.maoyan.com',
//       changeOrigin: true,
//       //pathRewrite:
//     })
//   );
//   多个的时候可以继续往下写
};