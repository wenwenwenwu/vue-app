<template>
<div class="home" @scroll="onSrcollChange" ref="home">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
        <!-- 冒号后不要空格 -->
        <template v-slot:nav-left>
            <img :src="navBarCurrentSlotStyle.leftIcon" alt="" />
        </template>
        <template v-slot:nav-center>
            <search-bar :bgColor="navBarCurrentSlotStyle.search.bgColor" :hintColor="navBarCurrentSlotStyle.search.hintColor" :icon="navBarCurrentSlotStyle.search.icon"></search-bar>
        </template>
        <template v-slot:nav-right>
            <img :src="navBarCurrentSlotStyle.rightIcon" alt="" />
        </template>
    </navigation-bar>

    <div class="home-content">
        <my-swiper :swiperImgs="swiperData.map((item) => item.icon)" :height="swiperHeight"></my-swiper>
        <activity>
            <div class="activity-520">
                <img v-for="(item, index) in activityData" :key="index" :src="item.icon" alt />
            </div>
        </activity>
        <mode-options></mode-options>
        <seconds :dataSource="secondsDatas"></seconds>
        <activity>
            <div class="activity-pin-gou-jie">
                <img src="@imgs/haoHuoQiang.gif" />
            </div>
        </activity>
        <goods layoutType="3" :isScroll="false"></goods>
    </div>
</div>
</template>

<script>
import MySwiper from "@c/swiper/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
import Goods from "@c/goods/Goods.vue";
import NavigationBar from "@c/currency/NavigationBar.vue";
import SearchBar from "@c/currency/SearchBar.vue";
export default {
    components: {
        MySwiper,
        Activity,
        ModeOptions,
        Seconds,
        Goods,
        NavigationBar,
        SearchBar,
    },
    data: function () {
        return {
            swiperData: [],
            swiperHeight: "184px",
            activityData: [],
            secondsDatas: [],
            navBarCurrentSlotStyle: {},
            navBarSlotStyle: {
                normal: {
                    leftIcon: require("@imgs/more-white.svg"),
                    search: {
                        bgColor: "#ffffff",
                        hintColor: "#999999",
                        icon: require("@imgs/search.svg"),
                    },
                    rightIcon: require("@imgs/message-white.svg"),
                },
                highlight: {
                    leftIcon: require("@imgs/more.svg"),
                    search: {
                        bgColor: "#d7d7d7",
                        hintColor: "#ffffff",
                        icon: require("@imgs/search-white.svg"),
                    },
                    rightIcon: require("@imgs/message.svg"),
                },
            },
            navBarStyle: {
                position: "fixed",
                backgroundColor: "",
            },
            scrollTopValue: -1,

            ANCHOR_SCROLL_TOP: 160,
        };
    },

    created: function () {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
        this.initData();
    },

    activated: function () {
        this.$refs.home.scrollTop = this.scrollTopValue
    },

    methods: {
        initData: function () {
            this.$http
                .all([
                    this.$http.get("/swiper"),
                    this.$http.get("activitys"),
                    this.$http.get("/seconds"),
                ])
                .then(
                    this.$http.spread((swiperData, activityData, secondsData) => {
                        this.swiperData = swiperData.list;
                        this.activityData = activityData.list;
                        this.secondsDatas = secondsData.list;
                    })
                );
        },

        onSrcollChange: function ($event) {
            //获取当前页面滚动距离
            this.scrollTopValue = $event.target.scrollTop;
            //计算navBar背景颜色
            //当前滚动的距离/锚点值 = navBar背景透明度
            let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
            this.navBarStyle.backgroundColor = "rgba(255, 255, 255, " + opacity + ")";
            if (opacity >= 1) {
                this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
            } else {
                this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
            }
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.home {
    width: 100%;
    height: 100%;
    background-color: $bgColor;
    overflow: hidden;
    overflow-y: auto;

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
