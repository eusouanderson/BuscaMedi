<template>
  <div class="Home">
    <div :class="['Input', { 'sticky-search': medicines.length > 0 }]">
      <div class="py-2">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center text-blue-800 mb-2">
            Encontre o melhor preço para seus medicamentos
          </h2>
          <div class="max-w-md mx-auto relative">
            <input type="text" v-model="searchQuery" class="w-full p-4 border border-gray-300 rounded-lg text-sm"
              placeholder="Digite o nome do medicamento..." @input="handleInput" @keyup.enter="clearSuggestions" />
            <!-- Lista de sugestões -->
            <ul v-if="suggestions.length > 0" class="suggestions-list">
              <li v-for="suggestion in suggestions" :key="suggestion._id" @click="selectMedicine(suggestion)">
                {{ suggestion.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="clearSearch" class="clear-btn" aria-label="Limpar a pesquisa">
        Limpar
      </button>
    </div>

    <!-- Carregamento -->
    <div v-if="loading" class="loading" role="status" aria-live="polite">
      <font-awesome-icon icon="spinner" spin />
    </div>

    <div class="flex justify-center items-center w-full py-6" v-if="!searchQuery && medicines.length === 0">
      <ProductCarousel />
    </div>

    <div v-if="medicines.length > 0" class="max-w-6xl mx-auto px-4 py-6">
      <h3 class="text-2xl font-semibold text-blue-800 mb-4 text-center" id="results-heading">
        Resultados encontrados
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="medicine in medicines" :key="medicine._id"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
          <img :src="medicine.image_url" :alt="`Imagem do medicamento ${medicine.name}`"
            class="w-32 h-32 object-contain mb-2" loading="lazy" />
          <h4 class="text-sm font-semibold">{{ medicine.name }}</h4>
          <p class="text-xs text-gray-500">{{ medicine.manufacturer }}</p>
          <p class="text-xs text-gray-600">{{ medicine.offer }}</p>
          <p class="text-lg text-blue-800 font-bold">{{ medicine.price }}</p>
          <p class="text-xs text-gray-600">Disponibilidade: {{ medicine.availability }}</p>
          <button v-if="medicine.link" class="search-link-btn-parceira text-sm mt-2"
            @click="openSearchLink(medicine.link)" aria-label="Abrir link para a farmácia parceira">
            Farmacia Parceira
          </button>
          <button v-if="medicine.search_link" class="search-link-btn text-sm mt-2"
            @click="openSearchLink(medicine.search_link)" aria-label="Pesquisar no Google">
            Pesquisar no Google
          </button>
          <button
            class="add-to-cart-btn bg-blue-500 text-black text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 mt-2"
            @click="addToCart(medicine)" aria-label="Adicionar ao carrinho">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-red-600 text-center mt-4" role="alert" aria-live="assertive">
      {{ error }}
    </div>

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
        const response = await this.fetchMedicines();
        if (Array.isArray(response)) {

          this.suggestions = response.filter(medicine =>
            medicine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.medicines = response;

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
    async clearSuggestions() {
      this.suggestions = [];
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
  margin-top: 20vh;
  /* 20% da altura da tela */
}

/* Input que fica fixo no topo após a pesquisa */
.sticky-search {
  position: fixed;
  color: #1e40af;
  top: 0;
  width: 100%;
  padding: 15px 20px;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.05);
  margin-top: 0;
  backdrop-filter: blur(10px);
  border: none;
  z-index: 1000;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: white;
}

/* Lista de sugestões */
.suggestions-list {
  position: absolute;
  color: #1e40af;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 500;
  padding: 0;
  margin-top: 2px;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

/* Botão de limpar pesquisa */
.clear-btn {
  display: inline-block;
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  text-align: center;
}

.clear-btn:hover {
  background-color: #ff0000;
}

/* Estilos para o carousel */
.search-link-btn-parceira {
  background-color: #4b9a2f;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.search-link-btn {
  background-color: #4189e1;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.search-link-btn-parceira:hover {
  background-color: #3c8328;
}

.search-link-btn:hover {
  background-color: #3572cb;
}


.search-link-btn-parceira {
  margin-top: 10px;
  background-color: #1e7aaf;
  /* Cor azul contrastante */
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-link-btn-parceira:hover {
  background-color: #202b48;
}


/* Ajuste para resultados */
.results {
  margin-top: 120px;
}

.suggestions-list {
  position: fixed;
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
