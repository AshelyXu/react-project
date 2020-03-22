/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 10:32:59
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-19 00:25:31
 */
import React, { Component } from 'react'
import Particles from 'react-particles-js'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

export default class Login extends Component {
    render() {
        return (
            <div style={{background:"rgba(0,0,0,0.9)",height:"100%"}}>
            <Particles params={{
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                      "onhover": {
                        "enable": false,
                        "mode": "repulse"
                      },
                      "onclick": {
                        "enable": true,
                        "mode": "push"
                      },
                      "resize": true
                    },
                    "modes": {
                      "grab": {
                        "distance": 800,
                        "line_linked": {
                          "opacity": 1
                        }
                      },
                      "bubble": {
                        "distance": 800,
                        "size": 80,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                      },
                      "repulse": {
                        "distance": 400,
                        "duration": 0.4
                      },
                      "push": {
                        "particles_nb": 4
                      },
                      "remove": {
                        "particles_nb": 2
                      }
                    }
                  },
                  
            }}/> 
            <div style={{position:"absolute",left:"50%",top:"50%",transform :"translate(-50%,-50%)",background:"rgba(255,255,255,0.3)",padding:"40px"}}>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }} //初始值
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Username"
              rules={[{ required: true, message: '请输入你的用户名!' }]} //校验规则
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入你的密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
            </div>
            </div>
        )
    }
    onFinish = values => {
          // console.log('Received values of form: ', values);
        //   localStorage.setItem("isLogin",true);
        //   this.props.history.push("/")
        axios.get("http://localhost:8080/users").then((res=>{
            // console.log(res.data)
            // 判断登录状态问题
            
            var state=true;
            // var onoff=true;
            for(var i=0;i<res.data.length;i++){
              // console.log(res.data[i].roleState);
                //三种情况
                // console.log(res.data[i].password,values.password);
                if(res.data[i].username===values.Username){
                  if(res.data[i].roleState){
                    // console.log(res.data[i].roleState)
                    // onoff=false;
                    state=false;
                    if(res.data[i].password+""===values.password){
                        message.success('登录成功');
                        localStorage.setItem("isLogin",true);
                        localStorage.setItem("userDate",JSON.stringify({
                          "username":res.data[i].username,
                          "roleType":res.data[i].roleType,
                        }));
                        this.props.history.push("/home")
                    }else{
                        message.error('密码错误');
                    }
                    return
                  }
                }
              
            }
            if(state){
              message.error("登录错误，请确认用户名输入正确或联系管理员打开后台权限")
          }
            
        }))
        };
}
