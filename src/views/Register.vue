<template>
  <div class="register-page">
    <navigation-bar
      :pageName="'注册'"
      @on-left-click="onBackClick"
    ></navigation-bar>
    <div class="register-page-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="用户名" />
      </div>
      <div class="input-container">
        <input v-model="password" type="text" placeholder="密码" />
      </div>
      <div class="input-container">
        <input v-model="confirmPassword" type="text" placeholder="密码" />
      </div>
      <div
        class="register-page-content-register page-commit"
        @click="onRegisterClick"
      >
        注册
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import md5 from "@js/md5.min.js";
export default {
  name: "register",

  components: {
    NavigationBar,
  },

  data: function () {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      md5Password: "",
    };
  },

  methods: {
    onBackClick: function () {
      this.$router.go(-1);
    },

    onRegisterClick: function () {
      if (this.username.length === 0) {
        alert("请完善用户名");
        return;
      }
      if (this.password.length === 0 || this.password != this.confirmPassword) {
        alert("请完善密码");
        return;
      }
      //与原生交互，保存用户名和密码
      this.md5Password = md5(this.password);
      if (window.androidJSBridge) {
        this.onRegisterToAndroid();
      } else if (window.webkit) {
        this.onRegisterToIOS();
      }
    },

    onRegisterToAndroid: function () {
      let userJson = JSON.stringify({
        "username": this.username,
        "password": this.md5Password,
      });
      let result = window.androidJSBridge.register(userJson);
      this.onRegisterCallback(result);
    },

    onRegisterToIOS: function () {
      let userObj = {
        "username": this.username,
        "password": this.md5Password,
      };
      window.registerCallback = this.onRegisterCallback;
      window.webkit.messageHandlers.register.postMessage(userObj);
    },

    //原生端注册成功(网络请求、token等信息存本地)后的回调方法
    onRegisterCallback: function (result) {
      if (result) {
        alert("注册成功");
        this.onBackClick();
      } else {
        alert("注册失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.register-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;

  &-content {
    width: 100%;
    height: 100%;

    &-register {
      margin-top: 40%;
    }
  }
}
</style>
