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
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";

export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: "184px",
      activityData: [],
    };
  },
  methods: {
    initData: function () {
      this.$http
        .all([this.$http.get("/swiper"), this.$http.get("activitys")])
        .then(
          this.$http.spread((swiperData, activityData) => {
            console.log(swiperData, activityData);
            this.swiperData = swiperData.list;
            this.activityData = activityData.list;
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
  }
}
</style>