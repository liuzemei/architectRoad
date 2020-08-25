<template>
  <div id="app">
    <el-header>
      <PageHeader />
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>

    <el-footer>
      <PageFooter />
    </el-footer>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";

export default {
  name: "app",
  components: { PageHeader, PageFooter },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #2a2a2a;
}
.el-main {
  min-height: calc(100vh - 120px);
}
</style>
