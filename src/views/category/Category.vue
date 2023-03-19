<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--    <div class="content">-->
    <div id="mcontent">
      <scroll id="tab-menu-scroll" :pull-up-load="true" :probe-type="3" ref="tscroll">
        <tab-menu :categories="categories"
                  @selectItem="selectItem"></tab-menu>
      </scroll>
      <!--    <右-->

        <scroll id="tab-content-scroll" :pull-up-load="true" :probe-type="3" ref="cscroll">
<!--          <div id="content">-->
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
<!--          </div>-->
        </scroll>

    </div>
  </div>

</template>

<script>
import NavBar from 'components/common/navbar/Navbar'

import TabMenu from './childComps/TabMenu'
import TabControl from 'components/content/TabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'

import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category";
import {POP, SELL, NEW} from "common/const";
import {debounce} from "common/utils";


export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: POP
    }
  },
  created() {
    // 1.请求分类数据
    this.fgetCategory()
  },
  mounted() {
    let refresh = debounce(this.$refs.cscroll.refresh,200)
    this.$bus.$on('categoryload', () => {
     refresh()
    })
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    fgetCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        //数据渲染后刷新以下侧边的滚动
        this.$nextTick(() => {
          this.$refs.tscroll.refresh()
        })
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        // 3.请求第一个分类的数据
        this.fgetSubcategories(0)
      })
    },
    fgetSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}

        this.fgetCategoryDetail(POP)
        this.fgetCategoryDetail(SELL)
        this.fgetCategoryDetail(NEW)
      })
    },
    fgetCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })


    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this.fgetSubcategories(index)
      this.$refs.cscroll.scrollTo(0,0,0.1)
      this.$refs.cscroll.refresh()
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }

}
</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}

#tab-menu-scroll {
  height: calc(100vh - 44px - 49px);
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

#mcontent {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  flex: 1;
}
#tab-content-scroll {
  height: calc(100vh - 44px - 49px) ;
  overflow: hidden;
}
</style>
