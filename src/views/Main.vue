<template>
<div class="main">
    <!-- 动态组件 -->
    <keep-alive>
        <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar @onChangeFragment="onChangeFragment" ref="toolBar"></tool-bar>
</div>
</template>

<script>
import ToolBar from "@c/currency/ToolBar.vue";
export default {
    name: "jingdong",
    components: {
        ToolBar,
        //异步引入组件（需要时引入）
        home: () => import("@c/Home"),
        shopping: () => import("@c/Shopping"),
        my: () => import("@c/My"),
    },

    activated: function () {
        this.pushFragment()
    },

    methods: {
        // 组件切换
        onChangeFragment: function (componentName) {
            this.currentComponent = componentName;
        },

        //指定加载的页面组件
        pushFragment: function () {
            let componentIndex = this.$router.history.current.params.componentIndex;
            if (componentIndex === undefined) {
                return;
            }
            this.$refs.toolBar.pushFragment(componentIndex);
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
