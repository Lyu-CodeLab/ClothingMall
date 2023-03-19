<template>
  <div id="detail">
    <detail-nav-bar class="detailbar" @tabItemClick="tabItemClick" ref="contentnavbar"></detail-nav-bar>
    <scroll class="scontent" :pull-up-load="true" :probe-type="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-imgs="topImgs" @imgload="imgload"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @allLoad="allLoad" @oneload="goodsimgload"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="btnClick" v-show="isShowBack"></back-top>
    <toast :message="message"  :isShow="isShow" ></toast>
  </div>
</template>

<script>


import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";

import {backTopMixin} from "common/mixin";
import {debounce} from "common/utils";
import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast

  },
  data() {
    return {
      iid: 0,
      topImgs: [],
      goods: {},
      shop: {},
      paramInfo: {},
      refresh: function () {
      },
      isLoadSwiper: false,
      detailInfo: {},
      commentInfo: {},
      recommends: [],
      themetopY: [0, 0, 0, 0],
      getThemeTopY:null,
      currentindex: 0,
      message:'',
      isShow:false
    }
  },
  mixins: [backTopMixin],
  created() {
    // 获取ID
    this.iid = this.$route.query.iid
    // 请求详情数据
    getDetail(this.iid).then(res => {
      let data = res.result
      //轮播图数据
      this.topImgs = data.itemInfo.topImages
      //详情图片和文字数据
      this.detailInfo = data.detailInfo
      //商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //店铺信息
      this.shop = new Shop(data.shopInfo)
      //参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //点击顶部栏跳转
    this.getThemeTopY = debounce(() => {
      this.themetopY = []
      this.themetopY.push(0);
      this.themetopY.push(this.$refs.params.$el.offsetTop - 303)
      this.themetopY.push(this.$refs.comment.$el.offsetTop - 303)
      this.themetopY.push(this.$refs.recommend.$el.offsetTop - 303)
      //this.themetopY.push(Number.MAX_VALUE)
      // console.log(this.themetopY)
    },100)
  },
  mounted() {
    this.refresh = this.$refs.scroll.refresh;


    let refresh = debounce(this.refresh, 100)
    //推荐部分加载完成
    this.$bus.$on('detailload', () => {
      refresh()
    })
  },

  methods: {
    imgload() {
      if (!this.isLoadSwiper) {
        this.refresh()
        this.isLoadSwiper = true

      }
    },
    goodsimgload() {
      //加载一次刷新一次，防抖
      this.refresh()
      // this.themetopY.push(Number.MAX_VALUE)
      this.getThemeTopY()
    },
    allLoad() {
      this.refresh()
    },
    tabItemClick(index) {
      //跳到指定位置
      this.$refs.scroll.scrollTo(0, -this.themetopY[index], 100)
    },
    //顶部分栏
    contentScroll(position) {
      let length = this.themetopY.length
      let positionY = -position.y
      this.isShowBack = positionY >= 1000
      //console.log(this.isShowBack);
      for (let i = 0; i < this.themetopY.length; i++) {
        // if (this.currentindex != i && -position.y >= this.themetopY[i] && -position.y < this.themetopY[i + 1])
        if(this.currentindex != i && ((i < length - 1 && positionY >= this.themetopY[i] && positionY < this.themetopY[i + 1])
        || (i === length -1 && positionY >= this.themetopY[i]))){
          this.currentindex = i
          this.$refs.contentnavbar.currentindex = i
        }
      }
    },
    addToCart() {
      // 1.创建对象
      const obj = {}
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImgs[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      obj.counter=1;
      obj.checked=true;
      // 3.添加到Store中
      this.$store.dispatch('addToCart', obj).then(
        res=>{
          this.isShow=true
          this.message=res
          setTimeout(()=>{
            this.isShow=false
          },2000)
        })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh

}

.detailbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.scontent {
  height: calc(100% - 44px - 49px);
}

.bottom-bar {
  height: 49px;
  position: fixed;

  text-align: center;
  background-color: #fff;

}
</style>
