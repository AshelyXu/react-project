/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-19 22:26:02
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-20 00:09:14
 */
import React, { Component } from 'react'
import axios from 'axios'
// ,Form,Input,Select
import './first.css'
import Editor from "./myEditor"
import { PageHeader, Steps, Button, message, Tag, Form, Input, Cascader, } from 'antd';
const { Step } = Steps;

export default class Update extends Component {
    state={
        current: 0,
        options: [],
        // 第一步中的数据
        myTitle:"",
        // 第二步中的数据
        myArticle:"",
        articleData:""
    }
    // 步骤条
    steps = [
        {
            // 这里不能使用 content属性因为content 会导致从上次一步返回得时候组件重新加载导致数据 丢失
            title: '基本信息',
        },
        {
            title: '文章内容',
        },
        {
            title: '提交文章',
            // content: <Tag color="green">点击添加确认提交</Tag>,
        },
    ];
    
    componentDidMount(){
        // 获取分类
        axios.get("http://localhost:8080/categories").then(res => {
            this.setState({
                options:res.data
            })
        })
        
        axios.get(`http://localhost:8080/articles/${this.props.match.params.myid}`).then(res=>{
            console.log(res.data);
            let {title}=res.data;
            // 设置第一步表单的值
            this.refs.myTitle.setFieldsValue({
                title,
                roleName:res.data.category,
            })
            // 将content 传给富文本编辑器
            this.setState({
                articleData:res.data.content
            })
        })
    }
    render() {
        return (
            <div>
            {/* 页头 */}
            <PageHeader
                className="site-page-header"
                onBack={() => this.props.history.goBack()}
                title="修改文章"
                subTitle="势如霹雳鬼神怯，生花妙笔纸上显"
            />
            {/* 步骤条 */}
            <Steps current={this.state.current}>
                {this.steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            {/* 显示内容 */}
            <div className="steps-content">
                {/* // this.steps[this.state.current].content
                // 利用this.steps[this.state.current]来判断显示哪个 不能使用三目要使用 disable 属性 */}
                <div style={{display:this.state.current === 0 ? 'block' : 'none'}}>
                    <Form
                        ref="myTitle"
                        layout="horizontal"
                        name="form_in_modal"
                        labelCol={{ span: 3, offset: 3 }}  //这里的span是宽度占几份 
                        wrapperCol={{ span: 18, }} //这里的span是内容占几份 
                    >
                        <Form.Item
                            name="title"
                            label="文章标题"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入文章标题!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="文章分类"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择文章分类！',
                                },
                            ]}
                        >
                            <Cascader options={this.state.options} onChange={this.onChange} placeholder="请选择文章的分类" fieldNames={{label:"title"}}/>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{display:this.state.current === 1 ? 'block' : 'none'}}>
                    {/* 这里用子传父将数据保存出来  */}
                    {/*   因为 ajax是异步，articleData第一次是空字符串传过去，在组件中使用componentDidMount生命周期只会执行一次  所以要控制Editor创建 可以使用三目还可以使用 key值运用diff算法 使Editor创建多次*/}
                    <Editor onWxl={this.getData} Xzw={this.state.articleData} key={this.state.articleData}></Editor>
                </div>
                <div style={{display:this.state.current === 2 ? 'block' : 'none'}}>
                    <Tag color="green">点击添加确认修改</Tag>
                </div>
            </div>
            {/* 步骤条按钮 */}
            <div className="steps-action">
                {this.state.current < this.steps.length - 1 && (
                    <Button type="primary" onClick={() => this.next()}>
                        下一步
                    </Button>
                )}
                {this.state.current === this.steps.length - 1 && (
                    <Button type="primary" onClick={this.submit}>
                        修改
                    </Button>
                )}
                {this.state.current > 0 && (
                    <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                        上一步
                    </Button>
                )}
            </div>
        </div>
        )
    }
     // 子传父拿到第二步的数据
     getData=(data)=>{
        // console.log(data);
        this.setState({
            myArticle:data
        })
    }
    // 
    onChange(value) {
        // console.log(value);
    }
    // 在第一个页面往第二个页面进行跳转的时候 要触发表单的验证 并且需要
    next() {
        if(this.state.current===0){
            this.refs.myTitle.validateFields().then(res=>{
            // console.log(res);
            // 触发表单验证 将数据存起来
            this.setState({
            current:1,
            myTitle:res
            })
        }).catch(res=>{
            message.error("请核验每一项")
            this.setState({
                current:0
            })
        })
        }
        
        const current = this.state.current + 1;
        this.setState({
            current
        })
    }
    //上一步按钮
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    // 提交函数
    submit=()=>{
        // console.log("提交");
        // 向后台发送数据 
        // console.log(this.state.myTitle,this.state.myArticle);
        axios.put(`http://localhost:8080/articles/${this.props.match.params.myid}`,{
            title:this.state.myTitle.title,
            category:this.state.myTitle.roleName,
            content:this.state.myArticle,
            author:JSON.parse(localStorage.getItem("userDate")).username,
            roleType:JSON.parse(localStorage.getItem("userDate")).roleType
        }).then(()=>{
            message.success("修改成功");
            this.props.history.push("/article-manage/list");
        })
       
    }
}
