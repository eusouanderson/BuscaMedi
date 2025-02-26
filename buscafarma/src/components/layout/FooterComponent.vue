<template>
  <div class="Footer">
    <!-- Navegação fixada -->
    <nav class="space-x-6 flex mb-4 md:mb-0 fixed top-0 left-0 w-full bg-gray-800 z-50 py-4">
      <a href="/" class="hover:text-gray-300 transition-colors">Inicio</a>
      <a href="/whoweare" class="hover:text-gray-300 transition-colors">Quem somos</a>
      <a href="/health" class="hover:text-gray-300 transition-colors">Saúde e bem estar</a>
      <a href="#" class="hover:text-gray-300 transition-colors">Farmacias Parceiras</a>
      <a href="#" class="hover:text-gray-300 transition-colors">Contato</a>
    </nav>

    <!-- Conteúdo da página com padding-top para evitar sobreposição do header fixo -->
    <div class="content pt-16">
      <!-- Seu conteúdo principal aqui -->
      <footer class="bg-blue-800 text-white shadow-lg py-6 mt-auto">
        <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <!-- Logo e Nome -->
          <div class="flex items-center space-x-3 mb-4 md:mb-0">
            <img :src="iconPath" alt="Logo" class="w-14 h-14 rounded-full shadow-md border-4 border-white transform transition-transform hover:scale-110" />
            <span class="text-2xl font-semibold tracking-wider">Farmacia+</span>
          </div>

          <!-- Ícones de redes sociais -->
          <div class="flex space-x-4">
            <a href="#" class="hover:text-gray-300 transition-colors">
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </a>
            <a href="#" class="hover:text-gray-300 transition-colors">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="#" class="hover:text-gray-300 transition-colors">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>

            
          </div>
        </div>

        <div class="text-center mt-6 text-sm text-gray-300">
          <p>&copy; 2025 Farmacia+. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  </div>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF, faTwitter, faInstagram);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      iconPath: new URL("@/assets/icons/mipmap-mdpi/icon.png", import.meta.url).href,
    };
  },
};
</script>
