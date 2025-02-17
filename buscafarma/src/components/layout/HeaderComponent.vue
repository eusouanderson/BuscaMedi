<template>
  <div class="Header">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl fixed top-0 w-full z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo e Nome -->
        <div class="flex items-center space-x-3">
          <img :src="iconPath" alt="Logo" class="w-24 h-24 rounded-full border-2 border-white"/>
          <span class="text-2xl font-semibold tracking-wide">Farmacia+</span>
        </div>

        <!-- Navegação Desktop -->
        <nav class="hidden md:flex space-x-6">
          <a href="#" class="hover:text-gray-300 transition-colors">Quem somos</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Saude e bem estar</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Farmacias Parceiras</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Contato</a>
        </nav>

        <!-- Ícone para dispositivos móveis -->
        <button @click="toggleMenu" class="md:hidden text-3xl focus:outline-none">
          <font-awesome-icon :icon="menuOpen ? 'times' : 'bars'" />
        </button>
      </div>
    </header>

    <!-- Menu Mobile -->
    <div v-if="menuOpen" class="md:hidden bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl rounded-t-3xl transition-all">
      <div class="p-4 flex flex-col space-y-8">
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Quem somos</a>
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Saude e bem estar</a>
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Farmacias Parceiras</a>
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Contato</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faTimes);

export default defineComponent({
  name: "HeaderComponent",
  components: { FontAwesomeIcon },
  data() {
    return {
      menuOpen: false,
      iconPath: new URL("@/assets/icons/mipmap-mdpi/icon.png", import.meta.url).href,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
});
</script>

<style scoped>
/* Animação do menu */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
}
</style>



