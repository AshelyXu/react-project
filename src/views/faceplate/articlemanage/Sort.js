/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-16 21:51:49
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-22 04:46:02
 */
import React, { Component } from 'react'
import { Table,Tag,Button } from 'antd';
import { HighlightOutlined,DeleteOutlined } from '@ant-design/icons';

import axios from "axios"
export default class Sort extends Component {
    state={
        data:[],
        columns: [
            { title: '分类名称', dataIndex: 'title', key: 'title' ,},
            { title: '分类等级', dataIndex: 'grade', key: 'grade',align:"center" ,
            render:(data)=>{
                if(data===1){
                    return <Tag color="#87d068">{data}</Tag>
                }
                if(data===2){
                    return <Tag color="#f90">{data}</Tag>
                }
                if(data===3){
                    return <Tag color="#f99">{data}</Tag>
                }
            }
        },
            { title: '操作', dataIndex: '', key: '' ,align:"center",
              render:()=>(
                  <div>
                  <Button type="circle" shape="circle" icon={<HighlightOutlined />}  disabled/>
                  <Button danger="true" shape="circle" icon={<DeleteOutlined />} style={{marginLeft:"5px"}} disabled/>
                  </div>
                
              )              
        }
          ]
    }
    render() {
          
        //   const data = [
        //     {
        //       key: 1,
        //       name: 'John Brown',
        //       age: 32,
        //       address: 'New York No. 1 Lake Park',
        //       description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        //     }
        //   ];
        return (
            <Table
    columns={this.state.columns}
    expandable={{
    //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    //   rowExpandable: record => record.name !== 'Not Expandable',
      rowExpandable:record=>{
          console.log(record.children.length);
          
          if(record.children.length){
              return true
          }else{
              return false
          }
      }
    }}
    dataSource={this.state.data}
    rowKey={item=>item.id}
  />
        )
    }
    componentDidMount(){
        axios.get("http://localhost:8080/categories").then(res=>{
            this.setState({
                data:res.data
            })
        })
    }
}
