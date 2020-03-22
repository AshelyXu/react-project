/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-14 21:53:59
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-19 22:24:06
 */
import React, { Component } from 'react'
import axios from "axios"
import { PageHeader } from 'antd';
export default class Preview extends Component {
    state = {
        title: "",
        category: [],
        content: ""
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title={this.state.title}
                    subTitle={this.state.category.join("/")}
                />
                {/* 将后端返回带标签的字符渲染成dom结构 */}
                <div dangerouslySetInnerHTML={{ __html: this.state.content }}>
                </div>
            </div>
        )
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/articles/${this.props.match.params.myid}`).then(res => {
            let { title, category, content } = res.data
            this.setState({
                title,
                category,
                content
            })
        })
    }
}
