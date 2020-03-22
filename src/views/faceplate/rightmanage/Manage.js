/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 23:23:05
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-17 19:44:27
 */
import React, { Component } from 'react'

import {Route,} from 'react-router-dom'
// 万物皆模块 注意引入
import Roles from './Role'
import Right from './Right'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
export default class Manage extends Component {
    state={
        dataList:[]
    }
    
    render() {
        return (
            <div>
            <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
            <TabPane tab="角色列表" key="/right-manage/roles">
            <Route path="/right-manage/roles" component={Roles}></Route>
            </TabPane>
            <TabPane tab="权限列表" key="/right-manage/right">
            <Route path="/right-manage/right" component={Right}></Route>
            </TabPane>
          </Tabs>,
            </div>
        )
    }
    callback=(key)=>{
        // console.log(key);
        this.props.history.push(key)
      }
}
