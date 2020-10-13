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
                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    bulletClass: "custom-bullet-class",
                    bulletActiveClass: "my-bullet-active",
                },
            },
        };
    },
};
</script>

<style lang="scss">
@import "@css/style.scss";

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

.my-bullet-active {
    background-color: white;
}
</style>
