<template>
  <div class="goods goods-waterfall" :style="{ height: goodsViewHeight }">
    <div
      class="goods-item goods-waterfall-item"
      v-for="(item, index) in dataSource"
      :key="index"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
    >
      <img
        class="goods-item-img"
        :src="item.img"
        alt=""
        :style="imgStyles[index]"
      />
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-name text-line-2"
          :class="{ 'goods-item-desc-name-hint': !item.isHave }"
        >
          <direct v-if="item.isDirect"></direct>
          <not-have v-if="!item.isHave"></not-have>
          <span>{{ item.name }}</span>
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">
            ¥{{ item.price | priceValue }}
          </p>
          <p class="goods-item-desc-data-volume">销量：{{ item.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from "@c/goods/Direct.vue";
import NotHave from "@c/goods/NotHave.vue";

export default {
  components: {
    Direct,
    NotHave,
  },

  data: function () {
    return {
      dataSource: [],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      ITEM_MARGIN_SIZE: 8,
      imgStyles: [],
      goodsItemStyles: [],
      goodsViewHeight: 0,
    };
  },

  created: function () {
    this.initData();
  },

  methods: {
    initData: function () {
      this.$http.get("/goods").then((data) => {
        this.dataSource = data.list;
        this.initImgStyles();
        //created()钩子函数
        //因为该钩子函数执行时DOM并未进行任何渲染，因此一定要将DOM操作的代码放进Vue.nextTick()的回调函数中
        //mounted()钩子函数
        //因为该钩子函数执行时所有的DOM挂载和渲染都已完成，因此时在该钩子函数中进行任何DOM操作都不会有问题
        this.$nextTick(() => {
          this.initWaterfall();
        });
      });
    },

    initImgStyles: function () {
      this.dataSource.forEach((item) => {
        let imgHeight = this.composeRandomImgHeight() + "px";
        this.imgStyles.push({
          height: imgHeight,
        });
      });
    },

    composeRandomImgHeight: function () {
      //返回随机图片高度
      let result =
        Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
        this.MIN_IMG_HEIGHT;
      return result;
    },

    initWaterfall: function () {
      let $goodsItems = this.$refs.goodsItem;
      let goodsItemStyle = {};
      if (!$goodsItems) return;
      let leftTotalHeight = 0,
        rightTotalHeight = 0;
      $goodsItems.forEach(($el, index) => {
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
        if (leftTotalHeight <= rightTotalHeight) {
          goodsItemStyle = {
            left: "0px",
            top: leftTotalHeight + "px",
          };
          leftTotalHeight += elHeight;
        } else {
          goodsItemStyle = {
            right: "0px",
            top: rightTotalHeight + "px",
          };
          rightTotalHeight += elHeight;
        }
        this.goodsItemStyles.push(goodsItemStyle);
        this.goodsViewHeight =
          (leftTotalHeight > rightTotalHeight
            ? leftTotalHeight
            : rightTotalHeight) + "px";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.goods {
  background-color: $bgColor;
  margin: $marginSize;

  &-item {
    background-color: white;
    border-radius: $radiusSize;
    box-sizing: border-box; //width为终极宽度（包含padding）
    padding: $marginSize;
    width: 49%; //除去margin，包含padding的宽度

    &-img {
      width: 100%; 
    }

    &-desc {
      width: 100%;

      &-name {
        font-size: $infoSize;
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

.goods-waterfall {
  position: relative;

  &-item {
    position: absolute;
  }
}
</style>