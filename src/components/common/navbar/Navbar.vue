<template>
<div class="navbar">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center">标题</slot></div>
  <div class="right"><slot name="right"></slot></div>
</div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 10;
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
.left {
  width: 60px;
}

.center {
  flex: 1;
}

.right {
  width: 60px;
}
</style>
