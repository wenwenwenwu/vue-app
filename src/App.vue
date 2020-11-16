<template>
<div id="app">
    <transition :name="transitionName">
        <keep-alive :include="virtualTaskStack">
            <router-view />
        </keep-alive>
    </transition>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            transitionName: "fold-left",
            virtualTaskStack: ["imooc"], //创建虚拟任务栈
        };
    },

    watch: {
        //监听路由对象，决定使用哪种过渡效果
        $route(to, from) {
            const routerType = to.params.routerType;
            if (routerType == "push") {
                //push新页面时，添加这个新页面的名称到虚拟任务栈顶层
                this.virtualTaskStack.push(to.name);
                this.transitionName = "push-out";
            } else {
                //pop页面时，删除虚拟任务栈顶层页面的名称
                this.virtualTaskStack.pop();
                this.transitionName = "push-back";
            }
            if (to.params.clearTask) {
                this.virtualTaskStack = ["jingdong"]
            }
        },
    },

    created: function() {
        this.$store.commit("setIsIphoneX",window.isIphoneX)
    }
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
