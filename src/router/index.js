import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'vue-cookies'
import DonMessage from '../utils/message'
import el from "element-ui/src/locale/lang/el";


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: resolve => require(['@/views/login/Login.vue'], resolve),
    meta: {
      title: '登录'
    }
  },

  {
    path: '/NotFound',
    name: 'NotFound',
    component: resolve => require(['@/views/NotFound.vue'],resolve),
    meta:{
      title: '页面不存在'
    }
  },

  //给需要登录的路由加一个meta
  {
    path: '/home',
    component: resolve => require(['@/views/home/Home.vue'], resolve),
    meta: {
      title: '绿洲Oasis',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        components: {
          main: () => import('@/components/Main.vue'),
          aside: () => import('@/components/Aside.vue')
        },
        meta: {
          title: '绿洲Oasis',
          requiresAuth: true
        }
      },
    ]
  },


]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.path === "/"){
    //有token且from.path!='/'则进入home页面
    if (Cookies.get("token")){
      console.log("from path: ", from.path)
      if (from.path === '/'){
        next("/home")
      }else if (from.path === '/NotFound'){
        next('/home')
      } else {
        next(from.path)
      }
    }else {
      next()
    }
  }

  if (to.matched.length === 0){
    if (!Cookies.get('token')){
      next("/")
    }else {
      next('/NotFound')
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Cookies.get('token')) {
      DonMessage.error("请先登录")
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  }
  next()
})


export default router
