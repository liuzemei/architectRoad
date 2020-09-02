<template>
  <div>123</div>
</template>

<script>
import { reactive, toRefs, watch, computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import * as types from "@/store/action-types";
export default {
  setup(props, context) {
    // attr slots emit
    // 默认只执行一次

    const route = useRoute();
    const store = useStore();

    const data = reactive({
      planList: store.state.planList,
    });

    onMounted(() => {
      store.dispatch(types.SET_PLAN_LIST);
    });

    return {
      ...toRefs(data),
    };
  },
  mounted() {},
};
</script>

<style>
</style>
