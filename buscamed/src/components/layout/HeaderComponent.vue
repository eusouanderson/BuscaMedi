<template>
  <div class="Home">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo e Nome -->
        <div class="flex items-center space-x-3">
          <img src="https://via.placeholder.com/50" alt="Logo" class="w-12 h-12 rounded-full border-2 border-white"/>
          <span class="text-2xl font-semibold tracking-wide">Farmacia+</span>
        </div>
        
        <!-- Navegação -->
        <nav class="space-x-6 hidden md:flex">
          <a href="#" class="hover:text-gray-300 transition-colors">Home</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Sobre</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Serviços</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Contato</a>
        </nav>

        <!-- Ícone para dispositivos móveis -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-3xl focus:outline-none">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Menu Mobile -->
    <div v-if="menuOpen" class="md:hidden bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl rounded-b-3xl rounded-t-3xl transition-all">
      <div class="p-4 flex flex-col space-y-8">
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Home</a>
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Sobre</a>
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Serviços</a>
        <a href="#" class="block text-lg py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Contato</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>

