<template>
  <div id="app">
    <div>珠峰年龄：{{$store.state.age}}</div>
    <button @click="$store.state.age=100">111</button>
    <div>我的年龄：{{$store.getters.myAge}}</div>
    <button @click="$store.commit('changeAge', 1)">同步经验+1</button>
    <button @click="$store.dispatch('changeAge', 1)">异步经验+1</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
