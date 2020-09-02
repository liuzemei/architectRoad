<template>
  <div id="app">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="/">
            <router-link to="/">首页</router-link>
          </a-menu-item>
          <a-menu-item key="/plan">
            <router-link to="/plan">时间计划</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>

      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <a-row>
          <a-col :span="6">
            <a-card size="small" title="Small size card" style="width: 300px">
              <template v-slot:extra>
                <a href="#">more</a>
              </template>
              <p>card content</p>
              <p>card content</p>
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="16" :offset="2">
            <router-view></router-view>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
// import {
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// } from "@ant-design/icons-vue";

import { reactive, toRefs, watch, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props, context) {
    // attr slots emit
    // 默认只执行一次

    const route = useRoute();
    const store = useStore();

    const state = reactive({
      selectedKeys: computed(() => [route.path]),
      allTime: ref(store.getters.allTimes),
    });
    // 监听
    // watch(
    //   () => route.path,
    //   (newValue) => {
    //     state.selectedKeys = [newValue];
    //   },
    //   { immediate: true }
    // );

    //computed
    // const selectedKeys = computed(() => [route.path]);
    // 单独
    // const allTime = ref(store.getters.allTimes); // 单独将某个属性变成响应式的

    // onMounted(() => {});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
