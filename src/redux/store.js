/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-20 01:29:30
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-21 22:56:26
 */
// createStore方法创建一个store对象  存储分发状态
import {createStore,applyMiddleware,combineReducers,compose} from "redux" 
import reduxThunk from "redux-thunk"
import reduxPromise from "redux-promise"
// 导入拆分的reducer 
import roleList from "./reducers/roleList"
import rightList from "./reducers/rightList"
import collapsed from "./reducers/collapsed"
// 创建一个reducer 接收到老的状态让然后 进行深复制 在修改复制好的状态最后返con
// 组装 reducer
const reducer =combineReducers({
    // 这里的key就是组件中取数据的时候 store.getState().key 的名字
    isCollapsed:collapsed,
    rightList,
    roleList
})
// 创建store对象的时候 顺便应用中间件reduxThunk 
// 同步的时候 action是普通的对象 
// 如果传过来的action 是函数就由中间件reduxThunk 来处理
// 如果使用了redux-promise 中间件的话 action可以是promise 对象
// 一般一个项目里只使用一个中间件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,composeEnhancers(applyMiddleware(reduxThunk,reduxPromise)));

export default store