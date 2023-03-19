<template>
  <navbar class="navbar">
    <div slot="left" class="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item,index) in titles"
        class="title-item"
        :class="{active:index==currentindex}"
        @click="itemClick(index)"
      >{{ item }}
      </div>
    </div>
  </navbar>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";

export default {
  name: "DetailNavBar",
  components: {
    Navbar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentindex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentindex = index
      this.$emit('tabItemClick',index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.left img{
  margin-top: 10px;
}
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

</style>
