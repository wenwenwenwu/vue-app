<template>
  <swiper :swiperOption="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :src="item" alt srcset :style="{ height: height }" />
    </swiper-slide>
    <!-- Optional controls -->
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    height: {
      type: String,
      default: "auto",
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
  },
  data: function () {
    return {
      // swiper 配置
      swiperOption: {
        // 自动切换
        autoplay: true,
        // 自动高度，让 siwper 的高度跟随 slide 的高度变化
        autoheight: true,
      },
    };
  },
};
</script>