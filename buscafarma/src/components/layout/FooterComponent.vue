<template>
  <div class="Footer">
    <!-- Navegação fixada -->
    <nav class="flex justify-center gap-4 bg-blue-800 text-white py-4 w-full text-xs sm:text-sm md:text-base">
      <a href="/" class="hover:text-gray-300 transition-colors px-3 py-2">Início</a>
      <a href="/whoweare" class="hover:text-gray-300 transition-colors px-3 py-2">Quem Somos</a>
      <a href="/health" class="hover:text-gray-300 transition-colors px-3 py-2">Saúde e Bem-Estar</a>
      <a href="#" class="hover:text-gray-300 transition-colors px-3 py-2">Farmácias Parceiras</a>
      <a href="#" class="hover:text-gray-300 transition-colors px-3 py-2">Contato</a>
      <a href="/privacy-policy" class="hover:text-gray-300 transition-colors px-3 py-2">Política de Privacidade</a>
      <a href="/terms-of-service" class="hover:text-gray-300 transition-colors px-3 py-2">Termos de Serviço</a>
      <a href="/cookies-policy" class="hover:text-gray-300 transition-colors px-3 py-2">Política de Cookies</a>
      <a href="/return-policy" class="hover:text-gray-300 transition-colors px-3 py-2">Política de Devolução</a>
    </nav>

    <!-- Conteúdo do footer -->
    <div class="content pt-12">
      <footer class="bg-blue-800 text-white shadow-lg py-6 mt-auto w-full">
        <div class="max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- Logo e Nome -->
          <div class="flex items-center gap-3">
            <img :src="iconPath" alt="Logo"
              class="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md border-2 md:border-4 border-white transform transition-transform hover:scale-110" />
            <span class="text-xs sm:text-sm md:text-lg font-semibold tracking-wider">Farmacia+</span>
          </div>

          <!-- Ícones de redes sociais -->
          <div class="flex gap-4 text-xs sm:text-sm md:text-lg">
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

        <div class="text-center mt-6 text-xs sm:text-sm md:text-sm text-gray-300">
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

<style scoped>
.Footer {
  background-color: #1E40AF;
  /* Azul escuro */
  overflow-x: hidden;
  /* Impede o excesso horizontal */
}

nav a {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  /* Ajusta o tamanho da fonte */
}

footer {
  background-color: #1E40AF;
  /* Azul escuro */
  color: white;
}

footer .max-w-screen-lg {
  max-width: 1080px;
}

footer .flex {
  flex-wrap: nowrap;
  /* Evita quebra de linha */
  justify-content: space-between;
}

footer .gap-4 {
  gap: 1rem;
  /* Ajusta o espaçamento */
}

footer .text-gray-300 {
  color: #D1D5DB;
}

footer .hover\:text-gray-300:hover {
  color: #E5E7EB;
}

footer .text-xs {
  font-size: 0.625rem;
  /* Ajusta para telas menores */
}

footer .text-sm {
  font-size: 0.75rem;
  /* Ajusta para telas pequenas */
}

footer .text-base {
  font-size: 0.875rem;
  /* Ajusta para telas médias */
}

footer .text-lg {
  font-size: 1rem;
  /* Tamanho base para telas grandes */

  /* Responsividade */
  @media (max-width: 768px) {
    footer .flex {
      flex-direction: row;
      /* Mantém o layout horizontal */
      justify-content: space-between;
      /* Garante que o conteúdo fique alinhado */
      flex-wrap: nowrap;
      /* Impede que o conteúdo quebre para nova linha */
    }

    footer .gap-4 {
      gap: 0.5rem;
      /* Ajusta o espaçamento para telas pequenas */
    }

    nav a {
      padding: 0.5rem 0.8rem;
      /* Ajusta o padding para melhor visualização */
      font-size: 0.625rem;
      /* Diminui o tamanho da fonte para telas pequenas */
    }
  }

  @media (max-width: 480px) {
    footer .text-xs {
      font-size: 0.5rem;
      /* Ajusta o tamanho da fonte para telas muito pequenas */
    }

    footer .text-sm {
      font-size: 0.625rem;
    }

    footer .text-base {
      font-size: 0.75rem;
    }

    footer .text-lg {
      font-size: 0.875rem;
      /* Mantém o tamanho de ícones pequenos */
    }
  }
}
  
  
</style>
