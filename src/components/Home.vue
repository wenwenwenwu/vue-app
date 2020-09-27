<template>
  <div class="home">
    <div class="home-content">
      <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
      <activity>
        <div class="activity-520">
          <img v-for="(item,index) in activityData" :key="index" :src="item.icon" alt />
        </div>
      </activity>
      <mode-options></mode-options>
      <seconds :dataSource="secondsDatas"></seconds>
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@imgs/haoHuoQiang.gif"/>
        </div>
      </activity>
      <goods></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
import Goods from "@c/goods/Goods.vue"
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: "184px",
      activityData: [],
      secondsDatas:[]
    };
  },
  methods: {
    initData: function () {
      this.$http
        .all([
          this.$http.get("/swiper"), 
          this.$http.get("activitys"),
          this.$http.get("/seconds")
          ])
        .then(
          this.$http.spread((swiperData, activityData, secondsData) => {
            this.swiperData = swiperData.list;
            this.activityData = activityData.list;
            this.secondsDatas = secondsData.list
          })
        );
    },
  },
  created: function () {
    this.initData();
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overFlow: hidden;
  overFlow-y: auto;

  &-content {
    height: 100%;

    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img {
        display: inline-block;
        width: 33.33%;
      }
    }

    .activity-pin-gou-jie {
      background-color: white;
      margin-top: $marginSize;
      
      img {
        width: 100%;
      }
    }
  }
}
</style>