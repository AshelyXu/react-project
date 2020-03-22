/*
 * @说明:
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 10:26:49
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 23:02:44
 */
// just component 的思想
import React from 'react'
import {
  HashRouter as Router, // HashRouter（/#/的路由模式）BrowserRouter(不带# 需要后端支持)，路由外层需要包裹的组件 as 是重命名
  Route, //每个路由都需要的组件
  Switch, //匹配到第一符合条件路径的组件就停止向下匹配  类似于break
  Redirect //重定向组件
} from "react-router-dom";
import Login from "../views/login/Login";
import Faceplate from "../views/faceplate/Faceplate";
//函数组件的写法 
const RouterRegedit = () => (
  // 路由组件最外层需要用HashRouter或者的路由模式）BrowserRouter进行包裹
  <Router>
    {
      // 一级路由的写法
      // 路由 一般出现匹配的错误 要用witch
      // 在react 中使用路由拦截的时候 是使用 三目表达式
    }
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/"  render={()=>
        localStorage.getItem("isLogin") ?<Route path="/" component={Faceplate}></Route>
        :
          <Redirect to="/login"></Redirect>
      }></Route>
      
      {/* // {localStorage.getItem("isLogin") ? (
      //   <Route path="/" component={Faceplate}></Route>
      // ) : (
      //   <Redirect to="/login"></Redirect>
      // )} */}
    </Switch>
  </Router>
);
// 所以要写成组件导出 在 路由组件中没有状态 所以可以使用函数式的组件写法
export default RouterRegedit;
