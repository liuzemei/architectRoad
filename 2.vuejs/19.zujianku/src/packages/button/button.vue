<template>
  <div :class="classs">button</div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "XButton",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(type) {
        if (
          !["warning", "danger", "success", "info", "primary"].includes(type)
        ) {
          throw new Error(
            `Button 的 type 只能是['warning','danger','success','info','primary']`
          );
        }
        return true;
      },
    },
  },
  setup(props) {
    const { type } = props;
    const classs = computed(() => ["mixin-button", `mixin-button-${props.type}`]);

    return {
      classs,
      type,
    };
  },
};
</script>
