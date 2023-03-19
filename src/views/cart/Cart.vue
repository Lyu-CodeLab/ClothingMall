<template>
  <div class="cart">
    <navbar class="navbar">
      <div slot="center">购物车({{ cartLength }})</div>
    </navbar>
    <scroll class="cartconten" :pull-up-load="true" :probe-type="3" ref="scroll">
<!--      <cart-list></cart-list>-->
      <cart-list></cart-list>
    </scroll>
    <bottom-bar class="bar"></bottom-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";
import Navbar from "components/common/navbar/Navbar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";
export default {
  name: "Cart",
  components: {
    Navbar,
    Scroll,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(['cartLength', "cartList"])},
 activated() {
    this.$refs.scroll.refresh()
 }


}
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}

.cartconten {
  height: calc(100vh - 44px - 49px - 44px);
  overflow: hidden;
}
.bar{

}

</style>
