/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 21:27:31
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-22 03:19:36
 */
import React, { Component } from 'react'
import axios from "axios"
import { Table, Tag } from 'antd';
import store from "../../../redux/store"
import {connect} from "react-redux"
// 采用了redux-thunk 的方法来使用redux来存储数据
class Right extends Component {
    state={
        columns : [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
              align:"center",
              render:(text, record, index)=>(
                //   console.log(text, record, index)
                <b>{text}</b>
              )
            },
            {
              title: '权限名称',
              dataIndex: 'title',
              key: 'title',
              align:"center",
            },
            {
                title: '权限等级',
                dataIndex: 'grade',
                key: 'grade',
                align:"center",
                render:text=>{
                let arr=["#87d068","#f90","#f00"]
                  return  <Tag color={arr[text-1]} style={{marginLeft:"5px"}}>{text}</Tag>
                }
              },
          ],
        data : []
    }
    componentDidMount(){
      if(store.getState().rightList.length===0){
          console.log("回调函数存入store");
          // 调用第二个参数传的函数就可以自动dispatch
          this.props.actionCreate();
      }
    }
    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.props.data} pagination={{pageSize:5,hideOnSinglePage:true}} >
            </Table>
        )
    }
}
// 获取数据 改变后会自动在传一次
const mapStateToProps=(state)=>{
    return{
      // 将store中的rightList数组通过data属性传给组件
      data:state.rightList
    }
}
// 发布状态
const mapDispatchToProps={
  actionCreate:()=>{
    //直接return 一个回调函数 而且会把dispatch 默认传到形参上 在ajax请求完成的then中 使用dispatch自己来发送状态
    return (dispatch)=>{
 // 异步的时候注意：在then里发送状态的时候会有错误 因为 是异步在执行的时候会返回 undefined 导致代码错误
 // 此时需要将异步的函数直接 返回到store中 然后运用插件react-thunk或者是react-promise
   axios.get("http://localhost:8080/rights").then(res=>{
    //  等异步结束以后 在store中发布状态 
     dispatch({
       type:"getRightList",
       payload:res.data
     })
 })
}
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Right)