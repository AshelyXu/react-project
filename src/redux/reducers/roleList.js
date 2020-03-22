/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-21 02:20:53
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 02:36:07
 */
const roleList =(prevState=[],action)=>{
        // prevState 老状态 ，接收到新的数据(相当于是状态的值) 第一次的时候没有老状态 可以手动赋值
        // 因为 store只能有一个所以会根据 传进来的type值来决定不同的操作进行返回'
        let {type,payload} =action;
        switch(type){
                // 用redux-promise 来进行处理
            case "getRoleList":
                var rightArr=[...prevState,...payload]
                return rightArr;
            default :
            return prevState;
        }
}
export default roleList