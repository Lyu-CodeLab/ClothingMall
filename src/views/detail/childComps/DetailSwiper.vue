<template>
  <div class="detail-swiper">
    <swiper class="ds">
      <swiper-item v-for="item in topImgs">
        <img v-lazy="item" alt="" class="topimg" @load="imgload">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "../../../components/common/swiper/Swiper";
import SwiperItem from "../../../components/common/swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  props: {
    topImgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imgload(){
      this.$emit('imgload')
    }
  }

}
</script>

<style scoped>
.ds {
  height: 300px;
  overflow: hidden;
}


</style>
