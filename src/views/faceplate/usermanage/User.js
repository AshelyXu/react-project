/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 23:15:29
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-19 03:01:21
 */
import React, { Component } from 'react'
import axios from "axios"
import { Table, Button, Switch, Modal, Form, Input, Select, message, } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
export default class Right extends Component {
    state = {
        visible: false,
        isupDate:false,
        beforUpedate:"",
        initial:{},
        columns: [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
                align: "center",
                render: (text, record, index) => (
                    //   console.log(text, record, index)
                    <b>{text}</b>
                )
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                align: "center",
            },
            {
                title: '用户状态',
                dataIndex: '',
                key: '',
                align: "center",
                render: (item => (
                    // console.log(item)
                    <Switch checked={item.roleState} onChange={() => this.change(item)} disabled={(item.default) ? true : false} />
                ))
            },
            {
                title: '操作',
                dataIndex: '',
                key: '',
                render: (item) => (
                    <div >
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={(item.default) ? true : false} onClick={()=>this.UpDate(item)}/>
                        <Button type="primary" shape="circle" icon={<DeleteOutlined />} style={{ marginLeft: "5px" }} disabled={(item.default) ? true : false} danger={true} onClick={() => this.mydel(item)} />
                    </div>

                )
            },
        ],
        data: [],
        List: [],
    }
    // 页面 挂载后 发送ajax
    componentDidMount() {
        // 
        axios.get("http://localhost:8080/users").then(res => {
            // console.log(res.data)
            this.setState({
                data: res.data
            })
        })
        // 
        axios.get("http://localhost:8080/roles").then(res => {
            // console.log(res.data)
            this.setState({
                List: res.data
            })
        })
    }
    // 页面渲染
    render() {
        return (
            <div>
                <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={this.add}>添加用户</Button>
                <Table columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 5, hideOnSinglePage: true }} rowKey={item => item.id}>
                </Table>
                <div>
                    {/* 添加用户的模态框 */}
                    <Modal
                        title="添加用户"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        cancelText="取消"
                        okText="确认添加"

                    >
                        <Form
                            ref="add"
                            layout="vertical"
                            name="form_in_modal"
                        >
                            <Form.Item
                                name="username"
                                label="用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="roleName"
                                label="角色"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择角色！',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="选择一个角色"
                                    onChange={this.onGenderChange}
                                    allowClear
                                >
                                    {
                                        this.state.List.map(item => (
                                            <Option value={item.roleName} key={item.id}>{item.roleName}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/* 修改用户的模态框 */}
                    <Modal
                        title="修改用户"
                        visible={this.state.isupDate}
                        onOk={this.handleUpdate}
                        onCancel={this.handleCancel}
                        cancelText="取消"
                        okText="确认修改"
                    >
                        <Form
                            ref="update"
                            layout="vertical"
                            name="form_in_modal"
                            initialValues={this.state.initial}
                        >
                            <Form.Item
                                name="username"
                                label="用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="roleName"
                                label="角色"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择角色！',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="选择一个角色"
                                    onChange={this.onGenderChange}
                                    allowClear
                                >
                                    {
                                        this.state.List.map(item => (
                                            <Option value={item.roleName} key={item.id}>{item.roleName}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>

        )
    }
    // 删除事件 需要更新数据库和更新页面 
    mydel = (item) => {
        // console.log(item);
        axios.delete(`http://localhost:8080/users/${item.id}`)
            .then(res => {
                // console.log(res.data);
                // 数据驱动视图所以在这里不用刷新页面 只要更新状态即可 拿到请求的所有数据然后进行 过滤 把当前点击的id的数据 过滤 让然后把剩余的数据重新setState 给 data
                // let list=this.state.data.filter(val=>val.id!==item.id)
                this.setState({
                    data: this.state.data.filter(val => val.id !== item.id)
                })
                message.success('删除成功')
            })
    }
    // 按钮的开关事件
    change = (item) => {
        item.roleState = !item.roleState;
        // console.log(item);
        axios.put(`http://localhost:8080/users/${item.id}`, item)
            // 修改data 实现局部更新
        .then(res=>(
            // console.log(this.state.data,res.data)
            this.setState({
                data:this.state.data
            })
        ))
    }
    // 添加用户按钮事件
    add = () => {
        // console.log(1);
        this.setState({
            visible: true,
        });
    }
    // 修改用户信息按钮事件 唤醒模态框
    UpDate=(item)=>{
        // 注意在第一次加载模态框的时候 拿不到模态框的 ref的值 可以通过id 来进行遍历  来进行 初始值的填充 所以第一次打开的时候利用 filter过滤来进行返回  然后利用表单组件的 初始值属性initialValues
        // console.log(this.refs.update);
        let arr=this.state.data.filter(val=>val.id===item.id);
        if(!this.refs.update){
        // console.log(this.refs.update);
        // 第一次 打开 模态框
        this.setState({
            initial:{
                username:arr[0].username,
                password:arr[0].password,
                roleName:arr[0].roleName,
            },
        })
        }else{
            // console.log(this.refs.update);
            // 后续打开模态框
            this.setState({
                initial:{}
            })
            var {username,password,roleName}=arr[0]
            this.refs.update.setFieldsValue({username,password,roleName})
        }
        this.setState({
            isupDate:true,
            beforUpedate:item
        })
    }
    //修改信息中模态框确认按钮事件
    // 修改的实现：先把点击修改按钮时候的更新前的数据保存下来 然后通过id进行 put请求 然后通过this.refs.update.validateFields() 触发验证拿到输入框的数据 对后端进行发送   点击确认按钮的时候 获取输入框的值 遍历老的数组 把id相同的 过滤 最后 把修改成功的数据与 过滤好的数据赋值给 data 
    handleUpdate=()=>{;
        // console.log(this.state.beforUpedate.id);
        this.refs.update.validateFields().then(value=>{
            // console.log(value);
            let arr=["小编","管理员","超级管理员"];       
            axios.put(`http://localhost:8080/users/${this.state.beforUpedate.id}`,{
                ...this.state.beforUpedate,
                ...value,
                roleType:arr.indexOf(value.roleName)+1
            }).then(res=>{
                // console.log(res.data);
                // 返回的是更新以后的数据
                var oldArr=this.state.data.filter(val=>val.id!==this.state.beforUpedate.id)
                // console.log(this.state.data.filter(val=>val.id!==this.state.beforUpedate.id));
                this.state.data.filter(val=>val.id!==this.state.beforUpedate.id)
                this.setState({
                    data:[...oldArr,res.data],
                    isupDate:false
                })
                message.success('修改成功')
            })
        })
    }
    // 添加用户模态框确认按钮事件
    handleOk = e => {
        
        // console.log(e);
        // console.log(this.refs.add);
        this.refs.add.validateFields()
            .then(res => {
                // 后端进行用户名重复 密码不正确的 判断 
                //在使用json server 的时候 需要把所有字段全部传入才可以
                // console.log(res);
                //处理  roleType
                let arr=["小编","管理员","超级管理员"]
                // console.log(arr.indexOf(res.roleName)+1);
                axios.post("http://localhost:8080/users",{...res,roleState:false,roleType:arr.indexOf(res.roleName)+1}).then(res=>{
                    // console.log(res.data,this.state.data);
                    // 将老的数据与新的数据合并
                    this.setState({
                        data:[...this.state.data,res.data],
                        visible: false,
                    })
                    message.success('添加成功')
                    this.refs.add.resetFields();
                })
                
            })
            .catch(res => {
                this.setState({
                    visible: true,
                })
                return message.error('添加失败，请核验每一项')
            }
            )
    };
    //模态框取消按钮
    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
            isupDate: false,
            
        });
    };
}
