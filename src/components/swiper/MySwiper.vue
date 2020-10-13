<template>
<swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
        <img class="swiper-slide-img" :src="item" alt srcset :style="{ height: height }" />
    </swiper-slide>
    <!-- Optional controls -->
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
            default: "1", //1圆点分页，2数字分页
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
                pagination: {},
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
                        type: "bullets",
                        bulletClass: "custom-bullet-class",
                        bulletActiveClass: "my-bullet-active",
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
    bottom: px2rem(12);

    .custom-bullet-class {
        box-sizing: border-box;
        border-radius: 100%;
        width: px2rem(6);
        height: px2rem(6);
        border: px2rem(1) solid white;
        margin: 0 px2rem(4);
        display: inline-block;
        opacity: 1;
    }
}

.swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: white;

    .swiper-pagination-current {
        font-size: $titleSize;
        font-weight: bold;
    }
}

.my-bullet-active {
    background-color: white;
}
</style>
