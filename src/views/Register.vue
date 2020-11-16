<template>
<div class="register-page">
    <navigation-bar :pageName="'注册'" @on-left-click="onBackClick"></navigation-bar>
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
        <div class="register-page-content-register page-commit" @click="onRegisterClick">注册</div>
    </div>
</div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
export default {
    name: "register",

    components: {
        NavigationBar,
    },

    data: function () {
        return {
            username: "",
            password: "",
            confirmPassword: ""
        }
    },

    methods: {
        onBackClick: function () {
            this.$router.go(-1);
        },

        onRegisterClick: function () {
            if (this.username.length === 0) {
                alert("请完善用户名")
                return
            }
            if (this.password.length === 0 || this.password != this.confirmPassword) {
                alert("请完善密码")
                return
            }
            //与原生交互，保存用户名和密码
        }
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
