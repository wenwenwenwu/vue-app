import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      //当打包构建应用时，JavaScript包会变的非常大，影响页面加载
      //可以把不同路由对应的组件分割成不同的代码块（chunk），当路由被访问的时候才加载，以此来提高效率，称为异步块
      //有时候我们想把某些路由组件都打包（npm run build）在同个异步块中
      //可用过以下的注释语法来提供chunk name
      //（未命名的chunk）dist/css/chunk-40f95e10.b51d7714.css    
      //（命名过的chunk）dist/css/GoodsList.3121a876.css  
      component: () => import(/* webpackChunkName: "GoodsList" */ '../views/GoodsList.vue')
    }
  ]
})

export default router
