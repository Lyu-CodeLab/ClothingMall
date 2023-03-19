<template>
  <div class="tabbarItem" @click="itemClick">
    <div v-if="!isActive">
      <slot name="tabbar-icon"></slot>
    </div>
    <div v-else>
      <slot name="tabbar-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="tabbar-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tarbar-item",
  props: {
    path: {
      type: String,
      required: true
    },
    activeColor:String
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tabbarItem {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tabbarItem img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/*.active {*/
/*  color: red;*/
/*}*/
</style>
