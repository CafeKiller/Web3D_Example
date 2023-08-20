
// 定义路由
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:"/home",
        name:"home",
        component: () => import("@/views/Home.vue")
    },
    {
        path:"/product",
        name:"product",
        component: () => import("@/views/Product.vue")
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router