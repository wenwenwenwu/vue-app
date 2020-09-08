<template>
  <div class="main">
    <!-- 动态组件 -->
    <component :is='currentComponent'></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import toolBar from "@c/ToolBar.vue";
export default {
  components: {
    "tool-bar": toolBar,
    //异步引入组件（需要时引入）
    'home': ()=> import('@c/Home'),
    'shopping': ()=> import('@c/Shopping'),
    'my': ()=> import('@c/My'),
  },
  methods: {
    // 组件切换
    onChangeFragment: function(componentName) {
        console.log(componentName)
    }
  },
  data: function() {
    return {
      currentComponent: 'home'
    }
  }
};
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>