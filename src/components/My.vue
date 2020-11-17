<template>
  <div class="my">
    <navigation-bar :pageName="'个人中心'" :isShowBack="false"></navigation-bar>
    <div class="my-content">
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avatar" src="@imgs/avater.png" />
        <p class="my-content-header-login">
          {{ $store.state.username ? $store.state.username : "登陆/注册" }}
        </p>
      </div>
      <div class="my-content-tools">
        <div
          class="my-content-tools-item"
          v-for="(item, index) in toolsData"
          :key="index"
        >
          <p class="my-content-tools-item-name">{{ item }}</p>
          <img
            class="my-content-tools-item-arrow"
            src="@imgs/right-arrow.svg"
          />
        </div>
      </div>
      <div
        class="my-content-logout page-commit"
        v-if="$store.state.username"
        @click="onLogoutClick"
      >
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
export default {
  components: {
    NavigationBar,
  },

  data: function () {
    return {
      toolsData: ["全部订单", "我的预约", "应用推荐", "用户福利"],
    };
  },

  methods: {
    onLoginClick: function () {
      this.$router.push({
        name: "login",
        params: {
          routerType: "push",
        },
      });
    },

    onLogoutClick: function () {
      if (window.androidJSBridge) {
        this.onLogoutToAndroid();
      } else if (window.webkit) {
        this.onLogoutToIOS();
      }
    },

    onLogoutToAndroid: function () {
      let result = window.androidJSBridge.logout();
      this.onLogoutCallback(result);
    },

    onLogoutToIOS: function () {
        window.logoutCallback = this.onLogoutCallback
        window.webkit.messageHandlers.logout.postMessage({})

    },

    onLogoutCallback: function (result) {
      if (result) {
          this.$store.commit("clearUsername")
        alert("退出登录成功");
      } else {
        alert("操作失败，请重试");
      }
    },
  },
};
</script>

// 

<style lang="scss">
// .my {
//   width: 100%;
//   height: 100%;
//   font-size: 32px;
// }
//
</style>

<style lang="scss" scoped>
@import "@css/style.scss";

.my {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: $bgColor;

  &-content {
    width: 100%;
    height: 100%;

    &-header {
      margin-top: $marginSize;
      background-color: white;
      height: px2rem(68);
      display: flex;
      align-items: center;
      border-top: px2rem(1) solid $lineColor;
      border-bottom: px2rem(1) solid $lineColor;
      padding: $marginSize;

      &-avatar {
        width: px2rem(52);
        height: px2rem(52);
      }

      &-login {
        margin-left: $marginSize;
        font-size: $titleSize;
      }
    }

    &-tools {
      &-item {
        display: flex;
        height: px2rem(46);
        box-sizing: border-box;
        align-items: center;
        padding: $marginSize;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;

        &-name {
          font-size: $infoSize;
          flex-grow: 1;
        }

        &-arrow {
          width: px2rem(16);
        }
      }
    }

    &-logout {
      margin-top: 20%;
    }
  }
}
</style>
