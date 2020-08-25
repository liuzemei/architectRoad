<template>
  <div id="app">
    <Bar />
    <Foo />
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Bar from "./components/Bar";
import Foo from "./components/Foo";

export default {
  components: { Bar, Foo },
};
</script>

<style>
</style>