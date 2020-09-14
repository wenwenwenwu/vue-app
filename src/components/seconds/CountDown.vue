<template>
  <div class="count-down">
    <p class="count-down-end-time">{{startHour}}点场</p>
    <p class="count-down-status">{{countDownStatus | filterTime}}</p>
  </div>
</template>

<script>
export default {
  props: {
    startHour: {
      //秒杀开始时间
      type: Number,
      required: true,
      default: 0,
    },
  },

  data: function () {
    return {
      countDownStatus: "", //秒杀倒计时/进行中/已结束
      countDownSeconds: 0,
      interval: undefined, //计时器
    };
  },

  created: function () {
    this.computCountDownStatus();
  },

  methods: {
    computCountDownStatus: function () {
      if (this.interval) {
        clearInterval(this.interval);
      }
      const date = new Date();
      if (date.getHours() > this.startHour) {
        this.countDownStatus = "活动已结束";
        return;
      }
      if (date.getHours() == this.startHour) {
        this.countDownStatus = "活动进行中";
        return;
      }
      //例:秒杀开始16点，当前时间15:34:12
      const diffHours = this.startHour - date.getHours() - 1;
      const diffMinutes = 60 - date.getMinutes() - 1;
      const diffSeconds = 60 - date.getSeconds() - 1;
      //倒计时秒数
      this.countDownSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
      //创建计时器（每隔1秒countDownSeconds-1，触发一次属性观察器，设置countDownStatus）
      this.interval = setInterval(() => {
        this.countDownSeconds -= 1;
      }, 1000);
    },
  },

  // 属性观察器
  watch: {
    countDownSeconds: function (newSeconds) {
      const hours = Math.floor(newSeconds / 3600); //正小数为零的四舍五入
      const minutes = Math.floor(newSeconds / 60) % 60;
      const seconds = newSeconds % 60; //取余
      this.countDownStatus = hours + ":" + minutes + ":" + seconds;
      if (newSeconds == 0) {
        this.computCountDownStatus();
      }
    },
    startHour: function () {
      this.computCountDownStatus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.count-down {
  font-size: $infoSize;
  margin-left: $marginSize;
  display: flex;

  p {
    padding: px2rem(2) px2rem(4);
  }

  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }

  &-status {
    background-color: white;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>