/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-21 02:20:24
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 23:17:10
 */
const collapsed =(prevState=false,action)=>{
        // prevState 老状态 ，接收到新的数据(相当于是状态的值) 第一次的时候没有老状态 可以手动赋值
        // 因为 store只能有一个所以会根据 传进来的type值来决定不同的操作进行返回'
        let {type,payload} =action;
        switch(type){
            case "wxl":
            // 管理的是一个布尔值所以可以直接返回不用深复制
            return payload;
            default :
            return prevState;
        }
}
export default collapsed;