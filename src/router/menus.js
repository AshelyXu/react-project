/*
 * @说明: 
 * @版本: 2.0
 * @姓名: Ashely
 * @Date: 2020-03-15 02:01:04
 * @最后编辑: Ashely
 * @LastEditTime: 2020-03-18 23:37:34
 */
import {
    TeamOutlined,
    ClusterOutlined,
    ReadOutlined,
    HomeOutlined,
    CommentOutlined,
    ContactsOutlined ,
    ContainerOutlined,
    HighlightOutlined,
    AlignLeftOutlined
  } from "@ant-design/icons";
let menus=[
    {
    name:"首页",
    icon:HomeOutlined,
    path:"/home",
    privilege:1
},
{
    name:"用户管理",
    icon:TeamOutlined,
    path:"/user-manage",
    privilege:3,
    child:[{
        name:"用户列表",
        icon:CommentOutlined ,
        privilege:3,
        path:"/user-manage/users"
    }]
},
{
    name:"权限管理",
    icon:ClusterOutlined ,
    path:"/right-manage",
    privilege:3,
    child:[{
        name:"角色列表",
        icon:ContactsOutlined ,
        privilege:3,
        path:"/right-manage/roles"
    },{
        name:"权限列表",
        icon:ContainerOutlined,
        privilege:3,
        path:"/right-manage/right"
    }]
},
{
    name:"文章管理",
    icon:ReadOutlined ,
    path:"/article-manage",
    privilege:1,
    child:[{
        name:"文章列表",
        icon:AlignLeftOutlined,
        privilege:1,
        path:"/article-manage/list"
    },{
        name:"文章分类",
        icon:HighlightOutlined,
        privilege:2,
        path:"/article-manage/sort"
    }]
}
]
// 到处的时候判断一下 权限
export default menus