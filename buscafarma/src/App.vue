<template>
  <div id="app">
    <HeaderComponent />
    <HomePageView />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue'
import HomePageView from './views/HomePageView.vue'
import FooterComponent from './components/layout/FooterComponent.vue'


export default {
  name: 'App',
  components: {
    HeaderComponent,
    HomePageView,
    FooterComponent
  
  }
}
</script>

