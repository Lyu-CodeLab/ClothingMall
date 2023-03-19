<template>
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
</template>

<script>

  import CartListItem from './CartListItem'
  //import {mapGetters} from "vuex";

	export default {
		name: "CartList",
    components: {
		CartListItem
    },
    computed:{
		  // ...mapGetters[{cartList:'cartList'}]
      cartList(){
        return this.$store.state.cartList
      }
    }
	}
</script>

<style scoped>

</style>
