<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">ClothingMall</div>
    </nav-bar>
    <tab-control class="other tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="otabControl"
                 v-show="isShowControl"
    ></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @SwiperImgload="SwiperImgload"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>

    <back-top @click.native="btnClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
//公用的工具函数
import {debounce} from 'common/utils'

//网络请求相关函数
import {getHomeMultidata, getHomeData} from "network/home";
import NavBar from "components/common/navbar/Navbar";

//当前页面的相关组件
import HomeSwiper from "./Childcomps/HomeSwiper";
import HomeRecommendView from "./Childcomps/HomeRecommendView";
import FeatureView from "./Childcomps/FeatureView";

//公用内容组件
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

//通用组件
import Scroll from "components/common/scroll/Scroll";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBack: false,
      isShowControl: false,
      tabOffsetTop: 0,
      saveY: 0,
      refresh:null
    }
  },


  created() {
    this.getMultidata();

    //请求商品数据
    this.getHomeProducts('pop', this.page);
    this.getHomeProducts('new', this.page);
    this.getHomeProducts('sell', this.page);
  },

  mounted() {
    //图片加载完成的事件监听
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('imgload', () => {
      refresh();
    })
  },

  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y

  },
  computed: {
    showGoodsList() {
      return this.goodsList[this.currentType].list
    }
  },
  methods: {
    // 事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.otabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    btnClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBack = -position.y > 1000
      //决定tabControl是否吸顶
      this.isShowControl = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeProducts(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    SwiperImgload() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    //网络请求
    getMultidata() {
      getHomeMultidata().then(res => {
        console.log(typeof res)
        this.recommends = res.data.recommend.list;
        this.banners = res.data.banner.list;
      })
    },
    getHomeProducts(type) {
      let page = this.goodsList[type].page + 1
      getHomeData(type, page).then(res => {
        this.goodsList[type].list.push(...res.data.list)
      })
      this.goodsList[type].page += 1;

    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  color: #fff;
  /*position: fixed;*/
  /*right: 0;*/
  /*left: 0;*/
  /*top: 0;*/
  z-index: 9;
}

#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.other {
  z-index: 10;
  position: relative;
}

</style>
