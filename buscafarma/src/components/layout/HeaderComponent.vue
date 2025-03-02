<template>
  <div class="Header">
    <!-- Extensão com imagem de cumprimento -->
    <div v-show="showGreeting" class="greeting-bar">
      <img :src="greetingImage" alt="Bem-vindo" class="greeting-image" />
    </div>

    <!-- Header -->
    <header
      class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl fixed top-[50px] w-full z-50 transition-all duration-300"
      :class="{ 'top-0': !showGreeting }">
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
      showGreeting: true,
      iconPath: new URL("@/assets/icons/mipmap-mdpi/icon.png", import.meta.url).href,
      greetingImage: new URL("@/assets/images/greeting.webp", import.meta.url).href,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    handleScroll() {
      this.showGreeting = window.scrollY < 1;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
});
</script>

<style scoped>
.Header {
  z-index: 1000;
}

.greeting-bar {
  position: relative;
  top: 0;
  width: 100%;
  /* Ajusta a largura para 100% */
  background-color: #1E40AF;
  padding: 0 20px;
  /* Reduz o padding nas laterais */
  text-align: center;
  z-index: 1001;
  transition: opacity 0.3s ease-in-out;
}

.greeting-image {
  width: 100%;
  height: auto;
  display: block;
}

@media (min-width: 640px) {
  .greeting-bar {
    padding: 0 50px;
    /* Aumenta o padding para telas maiores */
  }
}

@media (min-width: 1024px) {
  .greeting-bar {
    padding: 0 200px;
    /* Adapta o padding para telas maiores, como desktop */
  }
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
