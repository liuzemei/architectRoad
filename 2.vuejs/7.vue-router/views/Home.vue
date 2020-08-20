<template>
  <div>首页</div>
</template>


<script>
export default {
  mounted() {
    // 放的都是路由相关的属性
    console.log(this.$route)
    // 放的都是路由相关的方法
    console.log(this.$router)
  },
}
</script>