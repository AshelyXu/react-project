/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 21:27:31
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-20 23:19:41
 */
import React, { Component } from 'react'
import axios from "axios"
import { Table, Tag } from 'antd';
import store from "../../../redux/store"
// 采用了redux-thunk 的方法来使用redux来存储数据
export default class Right extends Component {
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
    actionCreate=()=>{
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
    componentDidMount(){
      // 运用redux 来进行数据的存储 通过判断 redux中存放数据的数组的长度 如果为0就产生ajax请求同时 调用dispatch 把状态存入 redux 
      // if只是用来判断 是发送ajax还是直接读取数据
      if(store.getState().rightList.length===0){
          // 第一次发布这里将回调函数存入store
          console.log("回调函数存入store");
          store.dispatch(this.actionCreate())
      }else{
        console.log("使用缓存,不在发送ajax");
        this.setState({
          data:store.getState().rightList
        })
      }
      // 这里的订阅是 将回调函数存入store的时候 ajax结束 dispatch 了状态然后拿回数据 
      // 如果进入 store内的dispatch被再次调用(ajax请求的数据发生了变化 subscribe 也会被再次的调用)
        this.Unscribe=store.subscribe(()=>{
          console.log("第一次调用");
          this.setState({
            data:store.getState().rightList
          })
        })
    }
    componentWillUnmount(){
      // 销毁订阅 类似于清空计时器
      this.Unscribe();
    }
    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} pagination={{pageSize:5,hideOnSinglePage:true}} >
            </Table>
        )
    }
    
      
}
