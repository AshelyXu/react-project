/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-16 22:52:51
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-22 03:56:28
 */
import React, { Component } from 'react'
import {withRouter} from 'react-router'
import { Layout,Menu, Dropdown ,Avatar } from 'antd';
// import store from "../../redux/store"
import {connect} from "react-redux"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  } from '@ant-design/icons';
const { Header } = Layout;
 class MyHeader extends Component {
    state = {
        collapsed: false,
      };
      exit=()=>{
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userDate")
        // 注意这里要使用Location.reload 不然组件不会刷新 
        // 使用 编程式导航跳转以后还可以通过路径进入
        // window.location.reload()
        this.props.history.push("/login")
      }
      menu = (
        <Menu>
          <Menu.Item>
            <div>
              {JSON.parse(localStorage.getItem("userDate")).username}
            </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={this.exit}>
              退出
            </div>
          </Menu.Item>
        </Menu>
      );
       // 将dispatch的参数抽象出来 写成一个函数 返回值为对象即可
      //  可以进行数据的处理和ajax的处理
      //  actionCreator=(data)=>{
      //     return {
      //       type:"wxl",
      //       payload:data
      //     }
      // }
      toggle = (data) => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
       this.props.actionCreator(data);
        // 成为发布者---修改状态的为发布者
        // store.dispatch(this.actionCreator(data))
      };
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {this.state.collapsed?<MenuUnfoldOutlined onClick={ ()=>this.toggle(false)} className="trigger"/>:<MenuFoldOutlined onClick={()=>this.toggle(true)} className="trigger" />
              }
              <div style={{float:"right",margin:"0 16px"}}>
              {JSON.parse(localStorage.getItem("userDate")).username}&nbsp;欢迎回来
                  <Dropdown overlay={this.menu} >
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              </div>
              
            </Header>

            
        )
    }
}
//  connect 传到组件上的属性----读取状态-状态映射成属性
const headerMapStateToProps=()=>{
  return {} 
}
// 将方法映射成属性使用
const mapDispatchToProps={
  actionCreator:(data)=>{
    return {
      type:"wxl",
      payload:data
    }
}
}
export default withRouter(connect(headerMapStateToProps,mapDispatchToProps)(MyHeader))