/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-21 02:20:38
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 02:28:12
 */
const rightList =(prevState=[],action)=>{
        // prevState 老状态 ，接收到新的数据(相当于是状态的值) 第一次的时候没有老状态 可以手动赋值
        // 因为 store只能有一个所以会根据 传进来的type值来决定不同的操作进行返回'
        let {type,payload} =action;
        switch(type){
            // 使用中间件 redux-thunk处理
            case "getRightList":
                var newArr=[...prevState,...payload]
                // 注意store里的名字与外面的名字相同的时候才可以使用解构赋值
                return newArr;
                // 用redux-promise 来进行处理
            default :
            return prevState;
        }
}
export default rightList