/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 10:24:03
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 23:01:14
 */
import React, { Component } from 'react';
import Routerregedit from "./router/index"
import {Provider} from 'react-redux'
import store from './redux/store'
class App extends Component{
  render(){
    return(
      // 在项目的最外层使用Provider来进行包裹 进行store的分发
    // 利用的是context(消费者生产者的模式) 来进行跨层级的通信
    <Provider store={store}>
    <Routerregedit></Routerregedit>
    </Provider>
    )
  }
}
// function App() {
//   // 跟组件导入路由组件即可
//   return (
//     // 在项目的最外层使用Provider来进行包裹 进行store的分发
//     // 利用的是context(消费者生产者的模式) 来进行跨层级的通信
//     <Provider store={store}>
//     <div style={{height:"100%"}}>
//     <Routerregedit></Routerregedit>
//     </div>
//     </Provider>
//   );
// }

export default App;
