<template>
  <div>
    <Create @handlePlan="handlePlan" />
  </div>
</template>

<script>
import Create from "./create";
export default {
  components: { Create },
  setup(props) {
    const handlePlan = (plan) => {
      console.log(plan);
    };
    return {
      handlePlan,
    };
  },
};
</script>

<style>
</style>