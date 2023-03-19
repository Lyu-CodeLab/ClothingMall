<template>
<div>
  <tabbar>
    <tabbarItem path="/home" activeColor="red">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="tabbar-icon">
      <img src="~assets/img/tabbar/home_active.svg" alt="" slot="tabbar-icon-active">
      <div slot="tabbar-text">首页</div>
    </tabbarItem >

    <tabbarItem path="/category" activeColor="red">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="tabbar-icon">
      <img src="~assets/img/tabbar/category_active.svg" alt="" slot="tabbar-icon-active">
      <div slot="tabbar-text">分类</div>
    </tabbarItem>

    <tabbarItem path="/shopCart" activeColor="red">
      <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="tabbar-icon">
      <img src="~assets/img/tabbar/shopcart_active.svg" alt="" slot="tabbar-icon-active">
      <div slot="tabbar-text">购物车</div>
    </tabbarItem>
    <tabbarItem path="/profile" activeColor="red">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="tabbar-icon">
      <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="tabbar-icon-active">
      <div slot="tabbar-text">我的</div>
    </tabbarItem>
  </tabbar>
</div>
</template>

<script>
import tabbar from "components/common/tabbar/tabbar";
import tabbarItem from "components/common/tabbar/tabbar-item";

export default {
  name: "MainTabbar",
  components:{
    tabbar,
    tabbarItem
  }
}
</script>

<style scoped>

</style>
