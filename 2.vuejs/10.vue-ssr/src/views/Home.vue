<template>
  <div>
    <div>name: {{$store.state.name}}</div>
    <button @click="$store.commit('changeName', 'lzm++')">changeName</button>
  </div>
</template>

<script>
export default {
  // 希望有些数据更新操作时在后端执行的
  asyncData(store) {
    // 只有页面级别组件才有
    return store.dispatch("changeName", "liuzemei");

    // 服务端执行完毕后，渲染的是正常的，但是前端的是老数据，就把后端的数据给覆盖了
  },

  // mounted() {
  //   this.$store.dispatch("changeName", "liuzemei");
  // },
};
</script>

<style>
</style>