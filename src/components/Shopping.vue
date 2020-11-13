<template>
<div class="shopping">
    <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
    <div class="shopping-content">
        <div class="shopping-content-list">
            <div class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
                <img class="shopping-content-list-item-check" :src="checkImg(item.isCheck)" @click="onGoodsCheckClick(item)" />
                <img class="shopping-content-list-item-img" :src="item.img" />
                <div class="shopping-content-list-item-desc">
                    <p class="shopping-content-list-item-desc-name text-line-2">
                        <direct v-if="item.isDirect"></direct>
                        {{ item.name }}
                    </p>
                    <div class="shopping-content-list-item-desc-data">
                        <p class="shopping-content-list-item-desc-data-price">
                            ¥{{ item.price | priceValue }}
                        </p>
                        <number-manager :initialNumber="item.number" @onChangeNumber="onNumberChange(arguments, item, index)"></number-manager>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopping-content-total">
            <div class="shopping-content-total-check">
                <img :src="checkImg(totalData.isAll)" @click="onAllCheckClick" />
                <p>全选</p>
            </div>
            <div class="shopping-content-total-price">
                <p class="shopping-content-total-price-total">
                    合计：<span>¥{{ totalData.totalPrice | priceValue }}</span>
                </p>
                <p class="shopping-content-total-price-all">
                    总额：<span>¥{{ totalData.totalPrice | priceValue }}</span>
                    &nbsp;&nbsp; 立减 <span>¥0.00</span>
                </p>
            </div>
            <div class="shopping-content-total-commit">
                去结算({{ totalData.goodsNumber }})
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import Direct from "@c/goods/Direct.vue";
import NumberManager from "@c/goods/NumberManager.vue";
export default {
    components: {
        NavigationBar,
        Direct,
        NumberManager,
    },
    data: function () {
        return {
            shoppingDatas: this.$store.state.shoppingDatas,
            totalData: {
                isAll: false,
                totalPrice: 0,
                goodsNumber: 0,
            },
        };
    },
    methods: {
        onNumberChange: function ($arguments, item, index) {
            let number = $arguments[0];
            this.$store.commit("changeShoppingDataNumber", {
                index: index,
                number: number,
            });
            if (item.isCheck) {
                this.computeGoodsTotal();
            }
        },

        onGoodsCheckClick: function (item) {
            item.isCheck = !item.isCheck;
            this.computeGoodsTotal();
        },

        onAllCheckClick: function () {
            this.totalData.isAll = !this.totalData.isAll;
            this.shoppingDatas.forEach((item) => {
                item.isCheck = this.totalData.isAll;
            });
            this.computeGoodsTotal();
        },

        checkImg: function (isCheck) {
            return isCheck ?
                require("@imgs/check.svg") :
                require("@imgs/no-check.svg");
        },

        //点击单选、全选、以及选中项的数量，改变均会触发该方法
        computeGoodsTotal: function () {
            this.totalData = {
                isAll: true, //先置为true,遍历时又一个未选中就置为false
                totalPrice: 0, //重置总价
                goodsNumber: 0, //重置总数
            };
            this.shoppingDatas.forEach((item) => {
                if (item.isCheck) {
                    this.totalData.totalPrice +=
                        parseFloat(item.price) * parseInt(item.number);
                    this.totalData.goodsNumber += parseInt(item.number);
                } else {
                    this.totalData.isAll = false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.shopping {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &-content {
        background-color: $bgColor;
        border-top: px2rem(1) solid $lineColor;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        &-list {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;

            &-item {
                background-color: white;
                padding: $marginSize;
                display: flex;
                border-bottom: px2rem(1) solid $lineColor;

                &-check {
                    width: $checkSize;
                    height: $checkSize;
                    align-self: center;
                    padding: px2rem(6);
                }

                &-img {
                    width: $listGoodsImgSize;
                    height: $listGoodsImgSize;
                }

                &-desc {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0 $marginSize;

                    &-name {
                        font-size: $infoSize;
                        line-height: px2rem(18);
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
                    }
                }
            }
        }

        &-total {
            height: px2rem(56);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background-color: white;
            border-top: px2rem(1) solid $lineColor;

            &-check {
                display: flex;
                align-items: center;
                margin: 0 $marginSize;

                img {
                    width: $checkSize;
                    height: $checkSize;
                    padding: px2rem(6);
                }

                p {
                    font-size: $infoSize;
                }
            }

            &-price {
                flex-grow: 2;
                display: flex;
                flex-direction: column;

                &-total {
                    font-size: $titleSize;
                    margin-bottom: px2rem(6);

                    span {
                        font-weight: bold;
                    }
                }

                &-all {
                    font-size: $infoSize;

                    span {
                        font-weight: bold;
                    }
                }
            }

            &-commit {
                width: px2rem(120);
                height: 100%;
                font-size: $titleSize;
                background-color: $mainColor;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
