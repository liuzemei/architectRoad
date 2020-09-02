<template>
  <a-form ref="ruleForm" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
    <a-form-item label="Activity time" required name="date1">
      <a-date-picker
        v-model:value="form.date"
        show-time
        type="date"
        placeholder="选择计划的日期"
        style="width: 100%;"
      />
    </a-form-item>
    <a-form-item label="请选择耗时">
      <a-input-number v-model:value="form.time"></a-input-number>
    </a-form-item>
    <a-form-item label="请输入待办事项">
      <a-textarea v-model:value="form.content"></a-textarea>
    </a-form-item>
    <a-form-item label="请输入待办事项">
      <a-button @click="onSubmit">创建待办事项</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, toRefs } from "vue";
import moment from "moment";
export default {
  setup(props, context) {
    // this 指向不明确的问题：不方便推断
    const state = reactive({
      form: {
        date: moment(Date.now()).format("YYYY-MM-DD"),
        time: 0,
        content: "",
      },
    });

    const onSubmit = () => {
      context.emit("handlePlan", state.form);
    };

    return {
      ...toRefs(state),
      onSubmit,
    };
  },
};
</script>
