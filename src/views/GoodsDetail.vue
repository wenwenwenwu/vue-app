<template>
<div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
        <template v-slot:nav-left>
            <div class="goods-detail-nav-left" @click="onBackClick">
                <img src="@imgs/back-2.svg" :style="{opacity: leftImgOpacity}" />
                <img src="@imgs/back-white.svg" alt="" :style="{opacity: navBarSlotOpacity}" />
            </div>
        </template>
        <template v-slot:nav-center>
            <p class="goods-detail-nav-title">商品详情</p>
        </template>
    </navigation-bar>
    <div class="goods-detail-content" @scroll="onScrollChange">
        <my-swiper :paginationType="'2'" :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs"></my-swiper>
        <div class="goods-detail-content-dog"></div>
    </div>
</div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar";
import MySwiper from "@c/swiper/MySwiper";
export default {
    data: function () {
        return {
            SWIPER_IMAGE_HEIGHT: 364,
            ANCHOR_SCROLL_TOP: 310,
            goodsData: {},
            scrollTopValue: 0,
        };
    },

    components: {
        NavigationBar,
        MySwiper,
    },

    created: function () {
        this.goodsData = this.$router.history.current.params.goods;
    },

    methods: {
        onBackClick: function () {
            this.$router.go(-1);
        },

        onScrollChange: function ($event) {
            //获取当前滚动的距离(超出屏幕上方距离)
            this.scrollTopValue = $event.target.scrollTop;
        },
    },

    computed: {
        leftImgOpacity: function () {
            return 1 - this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
        },

        navBarStyle: function () {
            return {
                backgroundColor: "rgba(216,30,6," + this.navBarSlotOpacity + ")",
                position: "fixed",
                top: 0
            };
        },

        navBarSlotOpacity: function () {
            return this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.goods-detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;

    &-nav-left {
        width: 100%;
        display: flex;
        position: relative;

        img {
            position: absolute;
            align-self: center;
        }
    }

    &-nav-title {
        width: 100%;
        height: 100%;
        font-size: $titleSize;
        font-weight: bold;
        text-align: center;
        color: white;
    }

    &-content {
        overflow: hidden;
        overflow-y: auto;
        height: 100%;

        &-dog {
            widows: 100%;
            height: px2rem(2000);
        }
    }
}
</style>
