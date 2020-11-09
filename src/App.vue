<template>
<div id="app">
    <transition :name="transitionName">
        <router-view />
    </transition>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            transitionName: "fold-left",
        };
    },

    watch: {
        //监听路由对象，决定使用哪种过渡效果
        $route(to, from) {
            const routerType = to.params.routerType;
            if (routerType == "push") {
                this.transitionName = "push-out";
            } else {
                this.transitionName = "push-back";
            }
        },
    },
};
</script>

<style lang="scss">
@import "@css/style.scss";

#app {
    //id=app的div
    width: 100%;
    height: 100%;

    .push-out-enter-active {
        animation-duration: 1s;
        animation-name: push-out-enter;
    }

    @keyframes push-out-enter {
        0% {
            transform: translate(100%, 0);
        }

        100% {
            transform: translate(0, 0);
        }
    }

    .push-out-leave-active {
        animation-duration: 1s;
        animation-name: push-out-leave;
    }

    @keyframes push-out-leave {
        0% {
            transform: translate(0, 0);
        }

        100% {
            transform: translate(-100%, 0);
        }
    }

    .push-back-enter-active {
        animation-duration: 1s;
        animation-name: push-back-enter;
    }

    @keyframes push-back-enter {
        0% {
            transform: translate(-100%, 0);
        }

        100% {
            transform: translate(0, 0);
        }
    }

    .push-back-leave-active {
        animation-duration: 1s;
        animation-name: push-back-leave;
    }

    @keyframes push-back-leave {
        0% {
            transform: translate(0, 0);
        }

        100% {
            transform: translate(100%, 0);
        }
    }
}
</style>
