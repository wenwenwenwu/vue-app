
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //Vue使用Vuex管理全局变量

export default new Vuex.Store({
  // 全局变量数据源
  state: {
    shoppingDatas: [],
    isIphoneX: false
  },

  // 计算属性
  getter: {

  },

  // 操作全局变量的方法（同步执行）
  mutations: {
    addShoppingData: function (state, goods) {
      const isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number += 1
          return true
        }
      })
      if (isExist === false) {
        //通过这个方法把新添加的属性变为响应式的数据（goods.isCheck = false不是响应式）
        Vue.set(goods, "isCheck", false)
        Vue.set(goods, "number", 1)
        state.shoppingDatas.push(goods)
      }
    },

    changeShoppingDataNumber: function (state, data) {
      state.shoppingDatas[data.index].number = data.number

    },

    setIsIphoneX:function(state,isIphoneX){
      state.isIphoneX = isIphoneX
    }
  },

  //帮助mutations进行异步操作
  actions: {
  },

  //将store分为多个module(模块)
  modules: {
  }
})
