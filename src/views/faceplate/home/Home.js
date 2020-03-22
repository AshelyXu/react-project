/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-13 10:32:50
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-22 03:58:36
 */
import React, { Component } from 'react'
import axios from "axios"
export default class Home extends Component {
    render() {
        return (
            <div>
                首页
            </div>
        )
    }
    componentDidMount(){
        axios.get("/ajax/comingList?ci=602&token=&limit=10&optimus_uuid=5DA661205D3B11EAA095510903A0FDFCA93AE0FC73EB4C6E8A921C9C63E6F31B&optimus_risk_level=71&optimus_code=10").then(res=>{
            console.log(res.data);
            
        })
    }
}
