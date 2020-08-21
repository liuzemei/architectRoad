<template>
  <div @click="show">
    Foo
  </div>
</template>

<script>
export default {
  methods:{
    show(){
      alert(1)
    }
  }
}
</script>