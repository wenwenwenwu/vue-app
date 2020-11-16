<template>
<div class="login-page">
    <navigation-bar :pageName="'登陆'" @on-left-click="onBackClick"></navigation-bar>
    <div class="login-page-content">
        <div class="input-container">
            <input v-model="username" type="text" placeholder="用户名" />
        </div>
        <div class="input-container">
            <input v-model="password" type="text" placeholder="密码" />
        </div>
        <div class="login-page-content-login page-commit" @click="onLoginClick">登陆</div>
        <a class="login-page-content-register" @click="onToRegisterClick">注册新用户</a>
    </div>
</div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar";
export default {
    name: "login",

    components: {
        NavigationBar,
    },

    data: function () {
        return {
            username: "",
            password: "",
        };
    },

    methods: {
        onBackClick: function () {
            this.$router.go(-1);
        },

        onLoginClick: function () {
            if (this.username.length === 0 || this.password.length === 0) {
                alert("用户名或密码未输入");
                return;
            }
        },

        onToRegisterClick: function () {
            this.$router.push({
                name: "register",
                params: {
                    routerType: "push"
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.login-page {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;

    &-content {
        width: 100%;
        height: 100%;

        &-login {
            margin-top: 40%;
        }

        &-register {
            font-size: $infoSize;
            color: $hintColor;
            margin-top: $marginSize;
            padding: $marginSize;
            float: right;
        }
    }
}
</style>
