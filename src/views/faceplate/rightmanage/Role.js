/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 21:27:43
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 00:41:31
 */
import React, { Component } from 'react'
import axios from "axios"
import { Table,Button,Tag } from 'antd';
import { EditOutlined,DeleteOutlined,AlignLeftOutlined } from '@ant-design/icons';
import store from "../../../redux/store"
export default class Role extends Component {
    state={
        columns : [
            {
              title: '角色名称',
              dataIndex: 'roleName',
              key: 'roleName',
            },
            {
              title: '操作',
              dataIndex: '',
              key: '',
              
              render:()=>(
                  <div >
                  <Button type="primary" shape="circle"  icon={<EditOutlined />} disabled/>
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} style={{marginLeft:"5px"}} disabled/>
                    <Button type="primary" shape="circle" icon={<AlignLeftOutlined />}  style={{marginLeft:"5px"}} disabled/>
                  </div>
                
              )
            },
          ],
        data : []
    }
    // 使用redux 异步处理的redux-promise
    actionCreate=()=>{
        //返回的是一个promise对象  需要直接把axios 返回出去 不能返回一个函数
        return axios.get("http://localhost:8080/roles").then(res=>{
            // 不需要使用 dispatch再次发布 直接return就行
            return {
                type:"getRoleList",
                payload:res.data
            }
        })
    }
    componentDidMount(){
       if(store.getState().roleList.length===0){
        // 注意这里必须加小括号 不然进入 store之后不会被执行
            store.dispatch(this.actionCreate()).then(res=>{
                console.log(res);
                this.setState({
                    data:res.payload
                })
            })
       }else{
            console.log("使用缓存");
            this.setState({
                data:store.getState().roleList
            })
       }
       
    }
    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} pagination={
                // 注意rowKey 里的每一项就是 表格里的数据
                {pageSize:5,hideOnSinglePage:true}}  rowKey={item=>item.id} expandable={{
                    expandedRowRender: (record) => {
                        // 双层遍历 外层用div 包裹 实现 category相同 的在一排 就是种类相同的在一排
                        // console.log(record);
                        return record.roleRight.map(val=>{
                            return(
                                <div key={val.category}>
                                    {
                                        val.list.map(item=><Tag key={item} color="#87d068">{item}</Tag>)
                                    }
                                </div>
                            )
                        })
                    },
                  }}>
            </Table>
        )
    }
}
