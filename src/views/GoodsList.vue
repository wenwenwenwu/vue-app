<template>
  <div class="goods-list-page">
    <navigation-bar @on-left-click="onBackClick" :pageName="'商品列表'">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangeLayoutTypeClick" />
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options @optionsChange="onGoodsOptionChange"></goods-options>
      <goods :layoutType="layoutType.type" :sort="sortType"></goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar.vue";
import GoodsOptions from "@c/goods/GoodsOptions.vue";
import Goods from "@c/goods/Goods.vue";

export default {
  data: function () {
    return {
      layoutTypeDatas: [
        {
          type: "1",
          icon: require("@imgs/list-type.svg"),
        },
        {
          type: "2",
          icon: require("@imgs/grid-type.svg"),
        },
        {
          type: "3",
          icon: require("@imgs/waterfall-type.svg"),
        },
      ],
      layoutType: {}, //布局类型
      sortType: "1", //排序类型
    };
  },
  components: {
    NavigationBar,
    GoodsOptions,
    Goods,
  },
  created: function () {
    this.layoutType = this.layoutTypeDatas[0];
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1);
    },
    onChangeLayoutTypeClick: function () {
      if (this.layoutType.type === "1") {
        this.layoutType = this.layoutTypeDatas[1];
      } else if (this.layoutType.type === "2") {
        this.layoutType = this.layoutTypeDatas[2];
      } else {
        this.layoutType = this.layoutTypeDatas[0];
      }
    },
    onGoodsOptionChange: function (sortType) {
      this.sortType = sortType;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.goods-list-page {
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;

  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
