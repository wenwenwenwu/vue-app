<template>
<!-- :style 格式动态绑定（绑定一个对象） -->
<div class="nav-bar z-index-max" :class="{ 'bottom-line': pageName }" :style="navBarStyle">
    <div class="left" @click="$emit('on-left-click')">
        <!-- v-if 组件条件加载 -->
        <img v-if="isShowBack" src="@imgs/back.svg" alt="" />
        <!-- slot 组件插槽 -->
        <slot name="nav-left"></slot>
    </div>
    <div class="center">
        <span class="page-title" v-if="pageName">{{ pageName }}</span>
        <slot name="nav-center"></slot>
    </div>
    <div class="right">
        <slot name="nav-right"></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        pageName: {
            type: String,
            default: "",
        },
        isShowBack: {
            type: Boolean,
            default: true,
        },
        navBarStyle: {
            type: Object,
            default: function () {
                return {
                    backgroundColor: "white",
                };
            },
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.nav-bar {
    width: 100%;
    height: px2rem(44);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,
    .right {
        height: 100%;
        width: px2rem(26);
        padding: 0 $marginSize;
        display: flex;

        img {
            width: 100%;
        }
    }

    .center {
        display: flex;
        flex-grow: 1; //拉伸填充剩余空间

        .page-title {
            font-size: $titleSize;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.bottom-line {
    border-bottom: 1px solid $lineColor;
}
</style>
