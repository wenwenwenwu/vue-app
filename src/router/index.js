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
      component: () => import('../views/GoodsList.vue')
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('../views/GoodsDetail.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import('../views/Buy.vue')
    },
  ]
})

export default router
