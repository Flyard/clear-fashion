<template>
  <RouterView></RouterView>
</template>

<script>
  import RouterView from './components/RouterView.vue';
  export default {
      name: 'App', 
      components: {
          RouterView
      } 
  }
</script>