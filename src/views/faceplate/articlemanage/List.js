/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-14 21:44:49
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-20 00:38:24
 */
import React, { Component } from 'react'
import axios from "axios"
import { Table,Button,message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined,DesktopOutlined } from '@ant-design/icons';
export default class List extends Component {
    state={
      columns: [
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            align: "center",
            render: (text, record, index) => (
                //   console.log(text, record, index)
                <b>{text}</b>
            )
        },
        {
            title: '文章作者',
            dataIndex: 'author',
            key: 'author',
            align: "center",
        },
        {
            title: '文章类别',
            dataIndex: 'category',
            key: 'category',
            align: "center",
            render:(text)=>(
              text.join("/")
            )
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (item) => (
                <div >
                    <Button  shape="circle" icon={<DesktopOutlined />}  onClick={()=>this.preview(item)}/>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ marginLeft: "5px" }} onClick={()=>this.UpDate(item)}/>
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} style={{ marginLeft: "5px" }} disabled={(item.default) ? true : false} danger={true} onClick={() => this.mydel(item)} />
                </div>
            )
        },
    ],
        data : []
    }
    componentDidMount(){
      // 根据当前的用户名来 请求数据
      let name=JSON.parse(localStorage.getItem("userDate")).username
      axios.get(`http://localhost:8080/articles?author=${name}`).then(res => {
            // console.log(res.data)
            this.setState({
                data: res.data
            })
        })
    }
    render() {
        return (
          <div>
          <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={this.add}>添加文章</Button>
          <Table columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 5, hideOnSinglePage: true }} rowKey={item => item.id}>
          </Table>
          </div>
        )
    }
    // 新增文章
    add=()=>{
      this.props.history.push("/article-manage/creat")
    }
    // 修改文章
    UpDate=(val)=>{
      console.log(val);
      this.props.history.push(`/article-manage/update${val.id}`)
    }
    // 删除
    mydel=(item)=>{
      console.log(item.id);
      axios.delete(`http://localhost:8080/articles/${item.id}`).then(res=>{
        // console.log(res.data);
        this.setState({
          data:this.state.data.filter(val=>val.id!==item.id)
        })
        message.success("删除成功")
      })
    }
    // 进预览页 等价于详情页
    preview=(data)=>{
      // console.log(data.id);
      this.props.history.push(`/article-manage/preview${data.id}`)
      
    }
}
