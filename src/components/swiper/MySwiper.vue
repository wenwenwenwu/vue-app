<template>
<!-- 轮播器 -->
<swiper :options="swiperOption">
    <!-- 轮播项 -->
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
        <img class="swiper-slide-img" :src="item" :style="{ height: height }" />
    </swiper-slide>
    <!-- 分页器 -->
    <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import {
    Swiper,
    SwiperSlide,
    directive
} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
    components: {
        Swiper,
        SwiperSlide,
    },

    directives: {
        swiper: directive,
    },

    props: {
        paginationType: {
            type: String,
            default: "1", //分页类型:1圆点2分数
        },

        height: {
            type: String,
            default: "auto",
        },

        swiperImgs: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },

    data: function () {
        return {
            swiperOption: {
                autoplay: true,
                autoHeight: "auto",
                pagination: {}, //分页器属性设置
            },
        };
    },

    created: function () {
        this.initPaginnationLayout();
    },

    methods: {
        initPaginnationLayout: function () {
            switch (this.paginationType) {
                case "1":
                    this.swiperOption.pagination = {
                        el: ".swiper-pagination",
                        bulletClass: "custom-bullet"
                    };
                    break;
                case "2":
                    this.swiperOption.pagination = {
                        el: ".swiper-pagination",
                        type: "fraction",
                    };
                    break;
            }
        },
    },
};
</script>

<style lang="scss">
@import "@css/style.scss";

.swiper-slide-img {
    width: 100%;
}

.swiper-pagination {
    top: px2rem(160);
}

.swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    top: auto;
    bottom: px2rem(32);
    font-size: $infoSize;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    color: white;
}

.custom-bullet {
    box-sizing: border-box;
    border-radius: 100%;
    width: px2rem(6);
    height: px2rem(6);
    border: px2rem(1) solid white;
    margin: 0 px2rem(4);
    display: inline-block;
    opacity: 1;
}

.swiper-pagination-bullet-active {
    background-color: white;
}
</style>
