
<template>
  <el-row>
    <el-col class="header-nav" :span="20">
      <img src="@/assets/logo.png" class="logo" />
      <el-menu
        mode="horizontal"
        background-color="#2a2a2a"
        text-color="#fff"
        :router="true"
        active-text-color="#fff"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/post">发表文章</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4">
      <el-menu
        mode="horizontal"
        background-color="#2a2a2a"
        text-color="#fff"
        class="header-right"
        :router="true"
        active-text-color="#fff"
      >
        <template v-if="true">
          <el-menu-item index="/reg">注册</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
        </template>

        <el-submenu v-else>
          <template slot="title">张三</template>
          <el-menu-item>退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>



<style lang="scss" scoped>
.header {
  color: blue;
}

.header-nav {
  display: flex;
  align-items: center;
}

.logo {
  width: 25px;
  height: 25px;
}

.header-right {
  float: right;
}
</style>

