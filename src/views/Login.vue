<template>
<div class="login-page">
    <navigation-bar :pageName="登陆" @onLeftClick="onBackClick"></navigation-bar>
    <div class="login-page-content">

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

    methods: {
        onBackClick: function () {
            this.$router.go(-1);
        },
    },
};
</script>

<style>
</style>
