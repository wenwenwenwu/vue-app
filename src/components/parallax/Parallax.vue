<template>
<!-- 视差组件 -->
<div class="parallax" @scroll="onScrollChange">
    <div class="parallax-slow" :style="{ top: slowTop }">
        <slot name="parallax-slow"></slot>
    </div>
    <div class="parallax-normal z-index-2">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            SPEED_DIFF: 2, //正常移动区移动100px,缓慢移动区移动100/2=50px
            scrollTopValue: 0,
        };
    },

    methods: {
        onScrollChange: function ($event) {
            //获取当前滚动的距离(超出屏幕上方距离)
            this.scrollTopValue = $event.target.scrollTop;
            this.$emit("onScrollChange", this.scrollTopValue);
        },
    },

    computed: {
        slowTop: function () {
            return this.scrollTopValue / this.SPEED_DIFF + "px";
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.parallax {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;

    &-slow {
        position: relative;
    }

    &-normal {
        position: relative; //不设置就不在外层了
    }
}
</style>
