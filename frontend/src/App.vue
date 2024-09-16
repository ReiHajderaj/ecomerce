<script setup>
import NavBar from './components/NavBar.vue';


</script>

<template>
  <NavBar />

  <router-view />

</template>


<script>
  export default {
    components: {
      NavBar,
    },
    name: 'App',
  }
</script>

<style scoped>

</style>
