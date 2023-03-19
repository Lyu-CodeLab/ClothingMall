<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
       <div> <img :src="item.image" alt=""></div>
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
}

.recommend-item {
  flex: 1;
  text-align: center;
}

.recommend img {
  width: 80%;
  margin-bottom: 10px;
}
</style>
