/*
 * @说明:
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 22:22:12
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-19 23:17:51
 */
import React, { Component } from "react";
import {
  Route, //每个路由都需要的组件
  Switch, //匹配到第一符合条件路径的组件就停止向下匹配  类似于break
  Redirect //重定向组件
  // NavLink// 声明式导航组件
} from "react-router-dom";
import Home from "./home/Home";
import User from "./usermanage/User";
import List from "./articlemanage/List";
import Creat from "./articlemanage/Creat";
import Update from "./articlemanage/Update";
import Sort from "./articlemanage/Sort";
import Preview from "./articlemanage/Preview";
import Manage from "./rightmanage/Manage";
import Myerror from "../myerror/Myerror";

import Mysider from "./Mysider"
import MyHeader from './MyHeader'
import { Layout } from 'antd';
import './Faceplate.css'
const {   Content } = Layout;
export default class SiderDemo extends Component {
  render() {
    var roleType=JSON.parse(localStorage.getItem("userDate")).roleType;
    return (
      <div style={{ height: "100%" }}>
        <Layout style={{ height: "100%" }}>
          <Mysider></Mysider>
          <Layout className="site-layout">
            <MyHeader></MyHeader>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: "auto"
              }}
            > 
              <Switch>
                <Route path="/home" component={Home}></Route>
                {
                  //用户管理列表的路由创建
                  roleType===3?<Route path="/user-manage/users" component={User}></Route>
                  :null
                }
                {
                  //权限管理列表的路由创建
                  roleType===3?<Route path="/right-manage" component={Manage}></Route>
                  :null
                }
                {
                  //文章列表分类路由创建
                  roleType>=2?<Route path="/article-manage/sort" component={Sort}></Route>
                  :null
                }
                {/* 文章列表路由 */}
                <Route path="/article-manage/list" component={List}></Route>
                {/* 添加文章路由 */}
                <Route path="/article-manage/creat" component={Creat}></Route>
                {/* 修改文章路由 */}
                <Route path="/article-manage/update:myid" component={Update}></Route>
                {/* 文章预览页路由的创建 */}
                <Route
                  path="/article-manage/preview:myid"
                  component={Preview}
                ></Route>
                <Route path="/myerror" component={Myerror}></Route>
                <Redirect from="/" to="/home" exact></Redirect>
                <Redirect from="*" to="/myerror"></Redirect>
              </Switch>
              {
                // 嵌套路由
                // 第一种写法 写在父组件里面 父组件要使用render的写法
                // <Route path="/right-manage" render={
                //     ()=><Manage>
                //     <Route path="/right-manage/roles" component={Roles}></Route>
                //     <Route path="/right-manage/right" component={Right}></Route>
                //     </Manage>
                // }></Route>
              }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
