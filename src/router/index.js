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
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('../views/GoodsDetail.vue')
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import('../views/GoodsList.vue')
    }
  ]
})

export default router
