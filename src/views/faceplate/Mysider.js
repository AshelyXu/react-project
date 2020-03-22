/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-16 20:42:17
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 23:32:29
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Layout, Menu } from 'antd';
import menus from '../../router/menus'
import './Faceplate.css'
// import store from "../../redux/store"
import {
    // UserOutlined,
    //   VideoCameraOutlined,
    //   UploadOutlined,
} from '@ant-design/icons';
import { connect } from "react-redux"
const { Sider } = Layout;
const { SubMenu } = Menu;
class Mysider extends Component {
    componentDidMount() {
        // 订阅函数 订阅者
        // 利用react-redux来进行 redux的使用
        //    this.unScribe=store.subscribe(()=>{
        //         this.setState({
        //             collapsed:store.getState().isCollapsed
        //         })
        //         // console.log(store.getState());
        //     })

    }
    // componentWillUnmount(){
    //     //这里在组件销毁的时候要取消订阅不然组件没有渲染但是会一直处在订阅的状态 会产生问题
    //     // 取消的函数是 store.subscribe的返回值
    //     this.unScribe();
    // }
    //要判断权限才能进行渲染
    show = (menus) => {

        return (menus.map((val) => {
            // 这里要用路径做key与后期逻辑有关
            // 通过 child判断是都有二级 的菜单
            // 获取自身权限的值的时候需要要外面获取
            var roleType = JSON.parse(localStorage.getItem("userDate")).roleType;
            if (val.child) {
                // console.log(val.privilege,JSON.parse(localStorage.getItem("userDate")).roleType);
                // 判断组件的权限是否大于用户的权限 大于就不渲染
                if (val.privilege > roleType) {
                    return null
                } else {
                    return (<SubMenu
                        key={val.path}
                        title={
                            <span>
                                <val.icon />
                                <span>{val.name}</span>
                            </span>
                        }
                    >
                        {/* 这里使用递归来进行第二层的遍历 */}
                        {this.show(val.child)}
                    </SubMenu>)
                }
            } else {
                if (val.privilege > roleType) {
                    return null
                } else {
                    return (
                        <Menu.Item key={val.path}>
                            <val.icon />
                            <span>{val.name}</span>
                        </Menu.Item>
                    )
                }
            }
        }))
    }

    render() {
        // 在location 的pathname 的值就是为当前打开的路径 组件是根据  一级菜单的key值来进行展开 所以 此时将 location.pathname 进行分割就好 然后再使用的时候 拼接上 前面的斜杠 即可
        // console.log(this.props.location.pathname.split("/")[1]);
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                {/* // defaultSelectedKeys  只有组件第一次创建的时候才会创建 所以要改为defaultSelectedKeys */}
                <Menu theme="dark" mode="inline" onClick={this.check} default={["/" + this.props.location.pathname.split("/")[1]]} selectedKeys={[this.props.location.pathname]}>
                    {this.show(menus)}
                </Menu>
            </Sider>
        )
    }
    check = (obj) => {
        //antd会自动传递参数过来 参数里包括当前点击的 key 
        // console.log(obj);
        // 路由跳转
        this.props.history.push(obj.key)

    }
}
// 类似于契约 来规定传到组件属性的值是什么
// 回家store中的大对象直接传递过来当做形参
const mapStateToProps = (state) => {
    // connect会将这两个 属性传到 当前组件上
    return {
        collapsed: state.isCollapsed
    }
}
// 如果没有withRouter 的写法
// export default connect(mapStateToProps)(Mysider)

export default withRouter(connect(mapStateToProps)(Mysider))