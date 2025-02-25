<template>
  <div class="Home">
    <div :class="['Input', { 'sticky-search': medicines.length > 0 }]">
      <div class="py-2">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center text-blue-800 mb-2">
            Encontre o melhor preço para seus medicamentos
          </h2>
          <div class="max-w-md mx-auto relative">
            <input
              type="text"
              v-model="searchQuery"
              class="w-full p-4 border border-gray-300 rounded-lg text-sm"
              placeholder="Digite o nome do medicamento..."
              @input="handleInput"
            />
            <!-- Lista de sugestões -->
            <ul v-if="suggestions.length > 0" class="suggestions-list">
              <li 
                v-for="suggestion in suggestions"
                :key="suggestion._id"
                @click="selectMedicine(suggestion)"
              >
                {{ suggestion.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="clearSearch" class="clear-btn">Limpar</button>
    </div>

    <!-- Carregamento -->
    <div v-if="loading" class="loading">
      <font-awesome-icon icon="spinner" spin />
    </div>

    <!-- Se não houver pesquisa ou resultados, exibe o Carousel -->
    <ProductCarousel v-if="!searchQuery && medicines.length === 0" /> 

    <!-- Resultados de busca -->
    <div v-if="medicines.length > 0" class="container mx-auto px-4 py-6 results">
      <h3 class="text-2xl font-semibold text-blue-800 mb-4 text-center">Resultados encontrados</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="medicine in medicines"
          :key="medicine._id"
          class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center space-y-2"
        >
          <img :src="medicine.image_url" :alt="medicine.name" class="w-16 h-16 object-contain mb-2" />
          <h4 class="text-sm font-semibold">{{ medicine.name }}</h4>
          <p class="text-xs text-gray-500">{{ medicine.manufacturer }}</p>
          <p class="text-xs text-gray-600">{{ medicine.offer }}</p>
          <p class="text-sm text-blue-800 font-bold">{{ medicine.price }}</p>
          <button class="search-link-btn" @click="openSearchLink(medicine.search_link)">
            Pesquisar no google
          </button>
          <button class="add-to-cart-btn" @click="addToCart(medicine)">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-red-600 text-center mt-4">
      {{ error }}
    </div>
    
    <!-- Importando o componente de carrinho -->
    <Cart :cart="cart" @clearCart="clearCart" />
  </div>
</template>


<script>
import { searchMedicines } from '@/services/medicineService.js';
import ProductCarousel from '@/components/ui/ProductCarousel.vue';
import Cart from '@/components/ui/Cart.vue';

export default {
  name: 'HomeComponent',
  components: {
    Cart, 
    ProductCarousel
  },
  data() {
    return {
      searchQuery: '',
      medicines: [],
      suggestions: [],
      error: null,
      cart: [],
      loading: false,
    };
  },
  methods: {
    // Método para lidar com a entrada do usuário e fazer a busca
    async handleInput() {
      if (this.searchQuery.length < 3) {
        this.suggestions = [];
        this.medicines = [];
        return;
      }

      // Tenta obter sugestões do localStorage
      const cachedSuggestions = localStorage.getItem(this.searchQuery);

      if (cachedSuggestions) {
        // Se houver dados no localStorage, use-os
        console.log("Usando dados do cache.");
        const cachedData = JSON.parse(cachedSuggestions);
        this.suggestions = cachedData.filter(medicine =>
          medicine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.medicines = cachedData;
        return;
      }

      try {
        this.loading = true;
        const response = await this.fetchMedicines();  // Corrigido para chamar diretamente fetchMedicines
        if (Array.isArray(response)) {
          // Filtra as sugestões de acordo com a pesquisa
          this.suggestions = response.filter(medicine =>
            medicine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.medicines = response;

          // Armazena os resultados no localStorage para consultas futuras
          localStorage.setItem(this.searchQuery, JSON.stringify(response));
        } else {
          this.suggestions = [];
          this.medicines = [];
        }
      } catch (err) {
        this.error = "Erro ao buscar sugestões.";
      } finally {
        this.loading = false;
      }
    },

    // Método para buscar os medicamentos
    async fetchMedicines() {
      if (!this.searchQuery.trim()) {
        this.suggestions = [];
        this.medicines = [];
        return;
      }

      this.error = null;

      try {
        const response = await searchMedicines(this.searchQuery); // Chama a função de busca externa
        if (Array.isArray(response)) {
          this.medicines = response;
          return response; // Retorna a resposta para uso no handleInput
        } else {
          this.medicines = [];
          return [];
        }
      } catch (err) {
        this.error = "Erro ao buscar medicamentos.";
        return [];
      }
    },

    // Método para selecionar um medicamento
    selectMedicine(medicine) {
      this.searchQuery = medicine.name;
      this.suggestions = [];
      this.fetchMedicines();  
    },

    // Método para limpar a pesquisa
    clearSearch() {
      this.searchQuery = '';
      this.medicines = [];
    },

    // Método para adicionar ao carrinho
    addToCart(medicine) {
      this.cart.push(medicine);
    },

    // Método para limpar o carrinho
    clearCart() {
      this.cart = []; // Limpa o carrinho
    },

    // Método para abrir o link de pesquisa
    openSearchLink(link) {
      if (link) {
        window.open(link, '_blank');
      } else {
        console.error("O link de pesquisa não está disponível.");
      }
    },
  },
};

</script>


<style scoped>
.Home {
  background-image: url('@/assets/images/medicine.jpg');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Input centralizado inicialmente */
.Input {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  margin-top: 20vh; /* 20% da altura da tela */
}

/* Input que fica fixo no topo após a pesquisa */
.sticky-search {
  position: fixed;
  color: #1e40af; /* Cor azul contrastante */
  top: 0;
  width: 100%;
  padding: 15px 20px;
  box-shadow: none; /* Removendo o box-shadow */
  background-color: rgba(255, 255, 255, 0.05); /* Fundo transparente */
  margin-top: 0; /* Remover espaço superior */
  backdrop-filter: blur(10px); /* Adicionando desfoque ao fundo */
  border: none; /* Remover borda */
  z-index: 1000;
  font-family: Arial, sans-serif; /* Fontes mais legíveis */
  font-size: 1rem; /* Tamanho de fonte legível (16px) */
  line-height: 1.5; /* Maior espaçamento entre as linhas */
}

/* Melhorando o input para acessibilidade */
.sticky-search input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem; /* Tamanho de fonte ajustado para facilitar a leitura */
  color: #333; /* Cor do texto mais escura para maior contraste */
  background-color: #fff; /* Fundo branco */
  border: 1px solid #ccc; /* Borda sutil */
  border-radius: 8px; /* Bordas arredondadas */
  outline: none; /* Remover outline padrão */
  box-sizing: border-box; /* Garantir que o padding não afete a largura total */
  transition: all 0.3s ease; /* Suaviza o efeito ao focar */
}

/* Foco no input para acessibilidade */
.sticky-search input:focus {
  border-color: #1e40af; /* Borda azul quando em foco */
  background-color: #f0f8ff; /* Fundo azul claro ao focar */
  box-shadow: 0 0 5px rgba(30, 64, 175, 0.5); /* Sombras suaves para indicar foco */
}

/* Aumentando a legibilidade do botão */
.clear-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 14px;
  border-radius: 50%;
  font-size: 10px; /* Tamanho do texto do botão para legibilidade */
  cursor: pointer;
  transition: background 0.3s ease;
}

.clear-btn:hover {
  background-color: #e60000;
}

.clear-btn:focus {
  outline: 3px solid #1e40af; /* Indicação clara de foco */
}
.search-link-btn {
  margin-top: 10px;
  background-color: #1e40af; /* Cor azul contrastante */
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}



/* Botão de minimizar */
.toggle-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #1e40af;
  color: white;
  padding: 8px 12px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-btn:hover {
  background-color: #1e3a8a;
}

/* Ajuste para resultados */
.results {
  margin-top: 120px;
}
.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}
</style>

