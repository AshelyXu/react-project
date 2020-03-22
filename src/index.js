/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 10:24:03
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-15 00:31:59
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 引入antd的样式
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
