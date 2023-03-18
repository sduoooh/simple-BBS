import { createRouter, createWebHashHistory } from 'vue-router'

import Index from "../pages/Index.vue"
import CreatePosts from "../pages/CreatePosts.vue"
import Login from "../pages/Login.vue"
import Post from "../pages/Post.vue"
import Register from "../pages/Register.vue"

import { useUserState } from "../data"

const routes = [
    {
        path: '/',
        component: Index,
        meta: {
            requireLoggedIn: false,
            requireLoggedOut : false
        }
    },
    {
        path: '/posts/create',
        component: CreatePosts,
        meta: { 
            requireLoggedIn: true,
            requireLoggedOut : false 
        }
    }
    ,
    {
        path: '/posts/:postId',
        component: Post,
        meta: {
             requireLoggedIn: false,
             requireLoggedOut : false
        }
    },

    {
        path: '/login',
        component: Login,
        meta: {
             requireLoggedIn: false ,
             requireLoggedOut : true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
             requireLoggedIn: false,
             requireLoggedOut : true 
        }
    },

    {
        path: '/:pathMatch(.*)*',
        component: {
            template: `页面不存在`
        },
        meta: {
             requireLoggedIn: false,
             requireLoggedOut : false
        }
    }

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const user = useUserState()
    if (to.meta.requireLoggedIn && !user.value.isLoggedIn) {
        alert('请先登录')
        router.push('/login')
    }
    else if(to.meta.requireLoggedOut && user.value.isLoggedIn){
        router.push('/')
    }
})

export default router