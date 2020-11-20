<template>
  <div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      //带name的slot内容放置在template中,冒号后不要空格
      //不带name的slot内容放置在div中
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img src="@imgs/back-2.svg" :style="{ opacity: leftImgOpacity }" />
          <img
            src="@imgs/back-white.svg"
            alt=""
            :style="{ opacity: navBarSlotOpacity }"
          />
        </div>
      </template>
      <!--  -->
      <template v-slot:nav-center>
        <p
          class="goods-detail-nav-title"
          :style="{ opacity: navBarSlotOpacity }"
        >
          商品详情
        </p>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <parallax @onScrollChange="onScrollChange">
        <template v-slot:parallax-slow>
          <my-swiper
            :paginationType="'2'"
            :height="SWIPER_IMAGE_HEIGHT + 'px'"
            :swiperImgs="goodsData.swiperImgs"
          ></my-swiper>
        </template>
        <template>
          // 内容
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              // 商品价格
              <p class="goods-detail-content-desc-item-price">
                ¥{{ goodsData.price | priceValue }}
              </p>
              // 商品名称
              <p class="goods-detail-content-desc-item-name">
                <direct v-if="goodsData.isDirect"></direct>
                {{ goodsData.name }}
              </p>
            </div>
            <div class="goods-detail-content-desc-item">
              // 已选商品
              <p class="goods-detail-content-desc-item-select">
                已选
                <span class="single-row-text">{{ goodsData.name }}</span>
              </p>
              // 附加服务
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li
                    class="goods-detail-content-desc-item-support-list-item"
                    v-for="(item, index) in attachDatas"
                    :key="index"
                  >
                    <img src="@imgs/support.svg" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
            // 商品描述
            <div class="goods-detail-content-desc-detail">
              <img
                v-for="(item, index) in goodsData.detailImgs"
                :key="index"
                :src="item"
                alt=""
              />
            </div>
          </div>
        </template>
      </parallax>
    </div>
    // 加入购物车、立即购买
    <div class="goods-detail-buy" :class="{'iphoneX-bottom' : $store.state.isIphoneX}">
      <div class="goods-detail-buy-add" @click="onAddGoodsClick">
        加入购物车
      </div>
      <div class="goods-detail-buy-now" @click="onBuyClick">立即购买</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/currency/NavigationBar";
import MySwiper from "@c/swiper/MySwiper";
import Direct from "@c/goods/Direct";
import Parallax from "@c/parallax/Parallax";
export default {
  name: "goodsDetail",
  data: function () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      ANCHOR_SCROLL_TOP: 310,
      goodsData: {},
      attachDatas: [
        "可配送海外",
        "京东发货&售后",
        "京准达",
        "211限时达",
        "可自提",
        "不可使用优惠券",
      ],
      scrollTopValue: 0,
    };
  },

  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax,
  },

  created: function () {
    this.loadGoodsData();
  },

  methods: {
    onBackClick: function () {
      this.$router.go(-1);
    },

    onScrollChange: function (scrollValue) {
      //获取当前滚动的距离(超出屏幕上方距离)
      this.scrollTopValue = scrollValue;
    },

    loadGoodsData: function () {
      this.$http
        .get("/goodsDetail", {
          params: {
            goodsId: this.$router.history.current.query.goodsId,
          },
        })
        .then((data) => {
          this.goodsData = data.goodsData;
        });
    },

    onBuyClick: function () {
      this.$router.push({
        name: "buy",
        params: {
          routerType: "push",
        },
        query: {
          goodsId: this.goodsData.id,
        },
      });
    },

    onAddGoodsClick: function () {
      this.$store.commit("addShoppingData",this.goodsData)
      alert("添加购物车成功");
      this.$router.push({
        name: "jingdong",
        params: {
          routerType: "push",
          componentIndex: 1,
          clearTask: true,
        },
      });
    },
  },

  computed: {
    leftImgOpacity: function () {
      return 1 - this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
    },

    navBarSlotOpacity: function () {
      return this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
    },

    navBarStyle: function () {
      return {
        backgroundColor: "rgba(216,30,6," + this.navBarSlotOpacity + ")",
        position: "fixed",
        top: 0,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &-nav-left {
    width: 100%;
    display: flex;
    position: relative;

    img {
      position: absolute;
      align-self: center;
    }
  }

  &-nav-title {
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }

  &-content {
    height: 100%;
    overflow: hidden;

    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 px2rem(16) rgba($color: #000000, $alpha: 0.2);

      &-item {
        background-color: white;
        padding: $marginSize;
        margin-bottom: $marginSize;

        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }

        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }

        &-select {
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;

          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
          }
        }

        &-support {
          margin-top: $marginSize;

          &-list {
            display: flex;
            flex-wrap: wrap;

            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;

              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }

              span {
                font-size: $minInfoSize;
                color: $hintColor;
              }
            }
          }
        }
      }

      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }

  &-buy {
    background-color: white;
    border-top: px2rem(1) solid $lineColor;
    height: px2rem(46);
    display: flex;
    justify-content: flex-end;

    div {
      font-size: $infoSize;
      color: white;
      width: px2rem(100);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-add {
      background-color: $mainColor;
    }

    &-now {
      background-color: darkgoldenrod;
    }
  }
}
</style>
