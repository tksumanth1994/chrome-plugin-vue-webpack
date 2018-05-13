<template>
  <div id="app">
    <item></item>
  </div>
</template>

<script>
import Item from './components/item.vue'

export default {
  name: 'app',
  components: {
    'item': Item
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="css">
@import "./assets/css/mini-default.css";
</style>
