<template>
  <div class="Header">
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl fixed top-0 w-full z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo e Nome -->
        <div class="flex items-center space-x-3">
          <img :src="iconPath" alt="Logo" class="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-white" />
          <span class="text-lg sm:text-2xl font-semibold tracking-wide">Farmacia+</span>
        </div>

        <!-- Navegação Desktop -->
        <nav class="hidden md:flex space-x-6">
          <a href="/" class="hover:text-gray-300 transition-colors">Inicio</a>
          <a href="/whoweare" class="hover:text-gray-300 transition-colors">Quem somos</a>
          <a href="/health" class="hover:text-gray-300 transition-colors">Saúde e bem-estar</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Farmácias Parceiras</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Contato</a>
        </nav>

        <!-- Ícone para dispositivos móveis -->
        <button @click="toggleMenu" class="md:hidden text-3xl focus:outline-none">
          <font-awesome-icon :icon="menuOpen ? 'times' : 'bars'" />
        </button>
      </div>
    </header>

    <!-- Menu Mobile com Transição -->
    <transition name="slide">
      <div v-if="menuOpen"
        class="md:hidden bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl absolute top-20 w-full left-0 transition-all">
        <div class="p-4 flex flex-col space-y-4">
          <a href="/whoweare" class="menu-link">Quem somos</a>
          <a href="/health" class="menu-link">Saúde e bem-estar</a>
          <a href="#" class="menu-link">Farmácias Parceiras</a>
          <a href="#" class="menu-link">Contato</a>
          <a href="/" class="menu-link">Inicio</a>
        </div>
      </div>
    </transition>
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
/* Links do menu mobile */
.Header {
  z-index: 1000;
}
.menu-link {
  display: block;
  text-align: center;
  font-size: 1.2rem;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Animação do menu */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
