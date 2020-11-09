<template>
<div class="main">
    <!-- 动态组件 -->
    <keep-alive>
        <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
</div>
</template>

<script>
import toolBar from "@c/currency/ToolBar.vue";
export default {
    name: "imooc",
    components: {
        "tool-bar": toolBar,
        //异步引入组件（需要时引入）
        home: () => import("@c/Home"),
        shopping: () => import("@c/Shopping"),
        my: () => import("@c/My"),
    },
    methods: {
        // 组件切换
        onChangeFragment: function (componentName) {
            this.currentComponent = componentName;
        },
    },
    data: function () {
        return {
            currentComponent: "home",
        };
    },
};
</script>

<style lang="scss" scoped>
.main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
