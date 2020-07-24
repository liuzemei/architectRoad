<template>
  <div>{{count}}</div>
  <button @click="handleClick">增加</button>
</template>

<script>
  import { reactive, toRefs } from 'vue'

  export default {
    name: 'App',
    setup() {
      let state = reactive({ count: 0 })

      function handleClick() {
        this.count++
      }

      return {
        ...toRefs(state),
        handleClick
      }
    }
  }
</script>
