<template>
  <div id="app">
    <!-- Exibe o HeaderMobileComponent em dispositivos móveis e HeaderComponent em telas grandes -->
    <component :is="headerComponent" />
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue';
import HeaderMobileComponent from './components/mobile/HeaderMobileComponent.vue'; 
import FooterComponent from './components/layout/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    HeaderMobileComponent, 
      FooterComponent
},
data() {
  return {
    screenWidth: window.innerWidth
  };
},
computed: {
  // Computed property para decidir qual header exibir baseado no tamanho da tela
  headerComponent() {
    return this.screenWidth <= 768 ? 'HeaderMobileComponent' : 'HeaderComponent'; 
    }
},
watch: {
  // Observa as mudanças na largura da tela e atualiza a variável `screenWidth`
  screenWidth() {
    this.$forceUpdate(); // Força a re-renderização para atualizar a escolha do header
  }
},
mounted() {
  // Atualiza a largura da tela ao redimensionar a janela
  window.addEventListener('resize', this.updateScreenWidth);
},
beforeUnmount() {  
  // Remove o listener de resize quando o componente for destruído
  window.removeEventListener('resize', this.updateScreenWidth);
},
methods: {
  updateScreenWidth() {
    this.screenWidth = window.innerWidth;
  }
}
};
</script>
