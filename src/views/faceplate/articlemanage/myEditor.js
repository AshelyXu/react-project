/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-19 20:30:36
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-20 00:14:20
 */
import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class myEditor extends Component {
    state = {
        editorState: "",
        contentState:""
    }
    componentDidMount(){
        // 这个生命周期只会执行一次 但是状态会更新两次所以拿不到
        // 文档代码
        // 这里要判断 Xzw是否 存在 如果 不存在的时候 不进行判断会导致无法输入
        if(!this.props.Xzw){
            return ;
        }
        const html = this.props.Xzw;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
            editorState,
        }) ;
        }
        // this.setState({
        //     contentState:htmlToDraft(this.props.Xzw)
        // })
    }
    render() {
        return (
            <div style={{ height: "500px", overflow: "auto",border:"solid 1px #ccc"}}>
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"//自定义的工具条样式class名
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange} // setState修改editorState
                    onContentStateChange={this.onContentStateChange} //输入内容，setState修改 contentState;将来转化成html
                    // 失去焦点的时候 传给父元素保存
                    onBlur={()=>{
                        this.props.onWxl(draftToHtml(this.state.contentState));
                    }}
                />
            </div>

        )
    }
    // 编辑器状态
    onEditorStateChange=(val)=>{
        this.setState({
            editorState:val
        })
        
    }
    // 内容状态
    onContentStateChange=(val)=> {
        // console.log(val);
        // console.log(val);
        this.setState({
            contentState:val
        })

    }
}
