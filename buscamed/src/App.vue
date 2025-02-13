<script setup lang="ts">
import HeaderComponent from './components/layout/HeaderComponent.vue';
import HomePageView from './views/HomePageView.vue';
import FooterComponent from './components/layout/FooterComponent.vue';

</script>

<template>
  <HeaderComponent />
  <HomePageView />
  <FooterComponent />
</template>

<style scoped>
body, html {
  height: 100%; 
  margin: 0;
}


.container {
  display: flex;
  flex-direction: column;
  height: 100%; 
}
</style>