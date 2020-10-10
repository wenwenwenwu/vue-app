<template>
<div class="goods-options z-index-2">
    <!-- 一级筛选 -->
    <ul class="goods-options-list">
        <li class="goods-options-list-item" v-for="(item, index) in optionDatas" :key="index">
            <a class="goods-options-list-item-content" @click="onOptionsItemClick(item, index)">
                <span class="goods-options-list-item-content-name" :class="{
              'goods-options-list-item-content-name-active':
                selectOption.id === item.id,
            }">{{ item.name }}</span>
                <span class="goods-options-list-item-content-caret caret" :class="[
              isShowSubContent && selectOption.id === item.id
                ? 'goods-options-list-item-content-caret-open'
                : 'goods-options-list-item-content-caret-close',
            ]" v-if="item.subs.length > 0"></span>
            </a>
        </li>
    </ul>
    <!-- 二级筛选 -->
    <transition name="fold-height">
        <div class="options-sub-content z-index-2" v-if="isShowSubContent">
            <ul class="options-sub-content-list">
                <li class="options-sub-content-list-item" v-for="(item, index) in selectOption.subs" :key="index">
                    <a class="options-sub-content-list-item-content" @click="onSubOptionsItemClick(item, index)">
                        <span class="options-sub-content-list-item-content-name" :class="{
                  'options-sub-content-list-item-content-name-active':
                    selectOption.id === item.id,
                }">{{ item.name }}</span>
                        <img class="options-sub-content-list-item-content-select" src="@imgs/options-select.svg" alt="" v-show="selectOption.id === item.id" />
                    </a>
                </li>
            </ul>
        </div>
    </transition>
    <!-- 遮盖层 -->
    <div class="cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            optionDatas: [{
                    //记录了选中子项的id和name
                    //当选中子项后遍历optionDatas,更新数据,从而更新UI
                    id: "1",
                    name: "默认",
                    subs: [{
                            id: "1",
                            name: "默认",
                        },
                        {
                            id: "1-2",
                            name: "价格由高到低",
                        },
                        {
                            id: "1-3",
                            name: "销量由高到低",
                        },
                    ],
                },
                {
                    id: "2",
                    name: "有货优先",
                    subs: [],
                },
                {
                    id: "3",
                    name: "直营优先",
                    subs: [],
                },
            ],
            selectOption: {},
            isShowSubContent: false,
        };
    },

    created: function () {
        this.selectOption = this.optionDatas[0];
    },

    methods: {
        onOptionsItemClick: function (item, index) {
            //显示子选项则关闭子选项列表
            if (this.isShowSubContent) {
                this.isShowSubContent = false;
                return;
            }
            //当前选项有子选项，且当前选项为选中项的话，显示子选项列表
            if (item.subs.length > 0 && item.id === this.selectOption.id) {
                this.isShowSubContent = true;
            }
            //选中当前项
            this.selectOption = item;
        },

        onSubOptionsItemClick: function (item, index) {
            //选中当前子选项
            this.selectOption = item;
            //遍历optionDatas，刷新数据
            this.optionDatas.forEach((option) => {
                option.subs.forEach((subOption) => {
                    if (subOption.id === this.selectOption.id) {
                        option.id = subOption.id;
                        option.name = subOption.name;
                    }
                });
            });
            //关闭子选项列表
            this.isShowSubContent = false;
        },
    },

    watch: {
        selectOption: function (newValue) {
            this.$emit("optionsChange", newValue.id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.goods-options {
    width: 100%;
    border-bottom: 1px solid $lineColor;

    &-list {
        display: flex;
        width: 100%;
        height: px2rem(46);
        background-color: white;

        &-item {
            flex-grow: 1;

            &-content {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                &-name {
                    font-size: $infoSize;
                    margin-right: $marginSize;

                    &-active {
                        color: $mainColor;
                    }
                }

                &-caret {
                    &-open {
                        transform: rotate(-180deg);
                        transition: all 0.3s;
                    }

                    &-close {
                        transform: rotate(0deg);
                        transition: all 0.3s;
                    }
                }
            }
        }
    }

    .options-sub-content {
        position: absolute;
        width: 100%;
        max-height: px2rem(180);
        overflow: hidden;
        overflow-y: auto;
        background-color: white;

        &-list {
            &-item {
                &-content {
                    display: flex;
                    align-items: center;
                    border-top: 1px solid $lineColor;
                    padding: $marginSize;
                    height: px2rem(44);
                    box-sizing: border-box;

                    &-name {
                        font-size: $infoSize;
                        display: inline-block;
                        flex-grow: 1;

                        &-active {
                            color: $mainColor;
                        }
                    }

                    &-select {
                        width: px2rem(18);
                        height: px2rem(18);
                    }
                }
            }
        }
    }

    .fold-height-enter-active {
        animation-duration: 0.3s;
        animation-name: fold-height-open;
    }

    @keyframes fold-height-open {
        0% {
            max-height: 0;
        }

        100% {
            max-height: px2rem(180);
        }
    }

    .fold-height-leave-active {
        animation-duration: 0.3s;
        animation-name: fold-height-close;
    }

    @keyframes fold-height-close {
        0% {
            max-height: px2rem(180);
        }

        100% {
            max-height: 0;
        }
    }
}
</style>
