<template>
<div class="goods" :class="[layoutClass, { 'goods-scroll': isScroll }]" :style="{ height: goodsViewHeight }" @scroll="onScrollChange" ref="goods">
    <div class="goods-item" :class="layoutItemClass" :style="goodsItemStyles[index]" v-for="(item, index) in sortGoodsData" :key="index" ref="goodsItem" @click="onGoodsItemClick(item)">
        <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" />
        <div class="goods-item-desc">
            <p class="goods-item-desc-name text-line-2" :class="{ 'goods-item-desc-name-hint': !item.isHave }">
                <direct v-if="item.isDirect"></direct>
                <no-have v-if="!item.isHave"></no-have>
                {{ item.name }}
            </p>
            <div class="goods-item-desc-data">
                <p class="goods-item-desc-data-price">
                    ￥{{ item.price | priceValue }}
                </p>
                <p class="goods-item-desc-data-volume">销量：{{ item.volume }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Direct from "@c/goods/Direct.vue";
import NoHave from "@c/goods/NotHave.vue";
export default {
    components: {
        Direct, //直营
        NoHave, //无货
    },
    props: {
        /**
                排序方式
                 * 1：默认
                 * 1-2：价格由高到低
                 * 1-3：销量由高到底
                 * 2：有货优先
                 * 3：直营优先
                 */
        sort: {
            type: String,
            default: "1",
        },
        /**
                布局方式
                 * 1：列表布局
                 * 2：网格布局
                 * 3：瀑布流布局
                 */
        layoutType: {
            type: String,
            default: "3",
        },
        // 是否允许 goods 单独滑动（列表页允许，首页不允许）
        isScroll: {
            type: Boolean,
            default: true,
        },
    },
    data: function () {
        return {
            goodsData: [],
            sortGoodsData: [],
            layoutClass: "goods-list",
            layoutItemClass: "goods-list-item",
            goodsViewHeight: "100%",
            itemMarginBottomSize: 8,
            MIN_IMG_HEIGHT: 178,
            MAX_IMG_HEIGHT: 230,
            imgStyles: [],
            goodsItemStyles: [],
            scrollTopValue: 0,
        };
    },
    created: function () {
        this.initData();
    },
    activated: function () {
        /**
         * 定位页面滑动位置，需要配合keepAlive 来使用
         */
        this.$refs.goods.scrollTop = this.scrollTopValue;
    },
    methods: {
        initData: function () {
            this.$http.get("/goods").then((data) => {
                this.goodsData = data.list;
                this.setSortGoodsData();
                this.initLayout();
            });
        },
        /**
         * 商品排序
         */
        setSortGoodsData: function () {
            switch (this.sort) {
                // 默认
                case "1":
                    // 我们使用slice(0)进行深拷贝，不改变原数组
                    this.sortGoodsData = this.goodsData.slice(0);
                    break;
                    // 价格
                case "1-2":
                    this.getSortGoodsDataFromKey("price");
                    break;
                    // 销量
                case "1-3":
                    this.getSortGoodsDataFromKey("volume");
                    break;
                    // 有货优先
                case "2":
                    this.getSortGoodsDataFromKey("isHave");
                    break;
                    // 直营优先
                case "3":
                    this.getSortGoodsDataFromKey("isDirect");
                    break;
            }
        },

        getSortGoodsDataFromKey: function (key) {
            //sort方法return值为-1时，goods1排在goods2前面
            //sort方法return值为1时，goods2排在goods1前面
            //sort方法return值为0时，排序不变
            this.sortGoodsData.sort((goods1, goods2) => {
                let v1 = goods1[key];
                let v2 = goods2[key];
                if (typeof v1 === "boolean") {
                    if (v1) {
                        return -1;
                    }
                    if (v2) {
                        return 1;
                    }
                    return 0;
                }
                return parseFloat(v2) - parseFloat(v1);
            });
        },

        /**
         * 设置布局
         */
        initLayout: function () {
            this.goodsItemStyles = [];
            this.imgStyles = [];
            switch (this.layoutType) {
                case "1":
                    this.layoutClass = "goods-list";
                    this.layoutItemClass = "goods-list-item";
                    break;
                case "2":
                    this.layoutClass = "goods-grid";
                    this.layoutItemClass = "goods-grid-item";
                    break;
                case "3":
                    this.layoutClass = "goods-waterfall";
                    this.layoutItemClass = "goods-waterfall-item";
                    this.initImgStyles();
                    //created()钩子函数
                    //因为该钩子函数执行时DOM并未进行任何渲染，因此一定要将DOM操作的代码放进Vue.nextTick()的回调函数中
                    //mounted()钩子函数
                    //因为该钩子函数执行时所有的DOM挂载和渲染都已完成，因此时在该钩子函数中进行任何DOM操作都不会有问题
                    this.$nextTick(() => {
                        this.initWaterfall();
                    });
                    break;
            }
        },
        /**
         * 根据随机高度，生成图片样式数据
         */
        initImgStyles: function () {
            this.goodsData.forEach((item) => {
                this.imgStyles.push({
                    height: this.composeRandomImgHeight() + "px",
                });
            });
        },
        /**
         * 返回随机的图片高度
         */
        composeRandomImgHeight: function () {
            let result = Math.floor(
                Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
                this.MIN_IMG_HEIGHT
            );
            return result;
        },
        /**
         * 瀑布流布局
         */
        initWaterfall: function () {
            //获取标识过的dom节点数组（要加$）
            let $goodsItems = this.$refs.goodsItem;
            if (!$goodsItems) return;
            let leftHeightTotal = 0,
                rightHeightTotal = 0;
            $goodsItems.forEach(($el, index) => {
                let goodsItemStyle = {};
                let elHeight = $el.clientHeight + this.itemMarginBottomSize;
                if (leftHeightTotal <= rightHeightTotal) {
                    goodsItemStyle = {
                        left: "0px",
                        top: leftHeightTotal + "px",
                    };
                    leftHeightTotal += elHeight;
                } else {
                    goodsItemStyle = {
                        right: "0px",
                        top: rightHeightTotal + "px",
                    };
                    rightHeightTotal += elHeight;
                }

                this.goodsItemStyles.push(goodsItemStyle);
            });
            // 在不需要 goods 自滑动的时候，再去计算 goodsView 的高度
            if (!this.isScroll) {
                this.goodsViewHeight =
                    leftHeightTotal > rightHeightTotal ?
                    leftHeightTotal :
                    rightHeightTotal + "px";
            }
        },
        /**
         * 商品点击事件
         */
        onGoodsItemClick: function (item) {
            //  商品无库存不允许跳转
            if (!item.isHave) {
                alert("该商品无库存");
                return;
            }
            this.$router.push({
                name: "goodsDetails",
                params: {
                    routerType: "push",
                },
                // 把传递的数据附加到我们的 URL 上
                query: {
                    goodsId: item.id,
                },
            });
        },
        /**
         * 滑动变化
         */
        onScrollChange: function ($e) {
            this.scrollTopValue = $e.target.scrollTop;
        },
    },
    watch: {
        sort: function () {
            this.setSortGoodsData();
        },
        /**
         * 监听布局类型切换
         * 1：列表布局
         * 2：网格布局
         * 3：瀑布流布局
         */
        layoutType: function () {
            this.initLayout();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.goods {
    background-color: $bgColor;

    //设置滚动
    &-scroll {
        overflow: hidden;
        overflow-y: auto;
    }

    &-item {
        background-color: white;
        padding: $marginSize;
        box-sizing: border-box;

        &-desc {
            width: 100%;

            &-name {
                font-size: $infoSize;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // word-break: break-word;
                // -webkit-line-clamp: 2;
                // -webkit-box-orient: vertical;
                // display: -webkit-box;
                line-height: px2rem(18);

                &-hint {
                    color: $hintColor;
                }
            }

            &-data {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: $marginSize;

                &-price {
                    font-size: $titleSize;
                    color: $mainColor;
                    font-weight: 500;
                }

                &-volume {
                    font-size: $infoSize;
                    color: $hintColor;
                }
            }
        }
    }
}

.goods-list {
    &-item {
        display: flex; //设置横排的简便方法
        border-bottom: 1px solid $lineColor;

        .goods-item-img {
            width: px2rem(120);
            height: px2rem(120);
        }

        .goods-item-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: $marginSize;
        }
    }
}

.goods-grid {
    margin: $marginSize; //列表边框
    // 子元素
    display: flex; //横排
    flex-wrap: wrap; //换行
    justify-content: space-between; //两边对齐

    &-item {
        width: 49%;
        border-radius: $radiusSize;
        margin-bottom: $marginSize;

        .goods-item-img {
            width: 100%;
        }
    }
}

.goods-waterfall {
    position: relative;
    margin: $marginSize;

    &-item {
        width: 49%;
        border-radius: $radiusSize;
        position: absolute;

        .goods-item-img {
            width: 100%;
        }
    }
}
</style>
