<template>
<div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
        <template v-slot:nav-left>
            <div class="goods-detail-nav-left" @click="onBackClick">
                <img src="@imgs/back-2.svg" />
            </div>
        </template>
    </navigation-bar>
    <div class="goods-detail-content">
        <my-swiper :paginationType="'2'" :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs"></my-swiper>
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
            navBarStyle: {
                backgroundColor: "",
            },
            goodsData: {},
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
    },
};
</script>

<style>
</style>
