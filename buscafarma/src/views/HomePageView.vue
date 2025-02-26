<template>
  <div class="Home">
    <div :class="['Input', { 'sticky-search': medicines.length > 0 }]">
      <div class="py-2">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center text-blue-800 mb-4">
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
            <!--- Filtro de preço -->
            <div v-if="medicines.length > 0" class="filter-container max-w-md mx-auto my-4">
              <label for="priceFilter" class="block text-sm text-gray-700">Ordenar por preço:</label>
              <select id="priceFilter" v-model="priceFilter" @change="sortMedicines"
                class="w-full p-2 border border-gray-300 rounded-lg">
                <option value="default">Selecione...</option>
                <option value="asc">Preço: Menor para Maior</option>
                <option value="desc">Preço: Maior para Menor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!-- Botão de limpar pesquisa e fazer o scroll para o topo -->
      <button @click="clearSearch(); scrollToTop()" class="clear-btn">Limpar</button>

    </div>

    <!-- Carregamento -->
    <div v-if="loading" class="loading">
      <font-awesome-icon icon="spinner" spin />
    </div>

    <!-- Se não houver pesquisa ou resultados, exibe o Carousel -->
    <div class="flex justify-center items-center w-full py-6" v-if="!searchQuery && medicines.length === 0">
      <ProductCarousel />
    </div>


    <!-- Resultados de busca -->
    <div v-if="medicines.length > 0" class="results ">


      <div class="results-grid ">
        <div v-for="medicine in medicines" :key="medicine._id"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
          <img :src="medicine.image_url" :alt="medicine.name" class="w-32 h-32 object-contain mb-2" />
          <h4 class="text-sm font-semibold">{{ medicine.name }}</h4>
          <p class="text-xs text-gray-500">{{ medicine.manufacturer }}</p>
          <p class="text-xs text-gray-600">{{ medicine.offer }}</p>
          <p class="text-lg text-blue-800 font-bold">{{ medicine.price }}</p>
          <p class="text-xs text-gray-600">Disponibilidade: {{ medicine.availability }}</p>
          <!-- Mostrar o botão "Farmacia Parceira" somente se o link existir -->
          <button v-if="medicine.link" class="search-link-btn-parceira text-sm mt-2"
            @click="openSearchLink(medicine.link)">
            Farmacia Parceira
          </button>

          <!-- Mostrar o botão "Pesquisar no Google" somente se o link de pesquisa existir -->
          <button v-if="medicine.search_link" class="search-link-btn text-sm mt-2"
            @click="openSearchLink(medicine.search_link)">
            Pesquisar no Google
          </button>


          <button
            class="add-to-cart-btn bg-blue-500 text-black text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 mt-2"
            @click="addToCart(medicine)">
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
      priceFilter: 'default',
    };
  },
  methods: {
    
    // Metodo para ordenar os medicamentos pelo preço
    sortMedicines() {
      if (this.priceFilter === 'asc') {
        this.medicines.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, '')); // Remover símbolos de moeda, se houver
          const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
          return priceA - priceB; // Menor para maior
        });
      } else if (this.priceFilter === 'desc') {
        this.medicines.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, '')); // Remover símbolos de moeda
          const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
          return priceB - priceA; // Maior para menor
        });
      }
    },

  
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
        return [];
      }

      this.error = null;

      try {
        const response = await searchMedicines(this.searchQuery); // Chama a função de busca externa
        if (Array.isArray(response)) {
          this.sortMedicines();
          this.medicines = response;
          return response; // Retorna a resposta para uso no handleInput
        } else {
          this.medicines = [];
          return [];
        }
      } catch (err) {
        this.error = "Erro ao buscar medicamentos.";
        this.medicines = [];
        return [];
      }
    },
    //Método para quando clicar no limpar o scroll volta ao topo
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
    // Metodo para quando rolar o scroll o input fixar no topo
    handleScroll() {
      const inputElement = document.querySelector('.Input');
      if (inputElement) {
        const inputRect = inputElement.getBoundingClientRect();
        const inputTop = inputRect.top + window.scrollY;
        if (inputTop < window.scrollY) {
          inputElement.classList.add('sticky-search');
        } else {
          inputElement.classList.remove('sticky-search');
        }
      }
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
/* Estilo da Home */
.Home {
  background-image: url('@/assets/images/medicine.jpg');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
}

/* Input centralizado */
.Input {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1000;
  width: 100%;
  max-width: 500px;
  margin-top: 20vh;
}

/* Efeito no hover do Input */
.Input:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Input de pesquisa com foco */
.Input input {
  width: 100%;
  padding: 12px;
  border: 2px solid #1e40af;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

.Input input:focus {
  border-color: #4b9a2f;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 162, 255, 0.7);
}

/* Estilo para a barra de pesquisa fixa */
.sticky-search {
  position: fixed;
  color: #1e40af;
  top: 0;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: 0;
  backdrop-filter: blur(10px);
  z-index: 1000;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
}

/* Lista de sugestões */
.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow-y: auto;
  z-index: 500;
  padding: 0;
  margin-top: 5px;
}

.suggestions-list li {
  padding: 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

/* Botão de limpar pesquisa */
.clear-btn {
  display: inline-block;
  background-color: #ff4d4d;
  color: white;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
}

.clear-btn:hover {
  background-color: #e53935;
}

/* Estilo para os botões de ação */
.search-link-btn,
.search-link-btn-parceira {
  background-color: #4189e1;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.search-link-btn:hover,
.search-link-btn-parceira:hover {
  background-color: #3572cb;
}
.results {
  margin-top: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 4 colunas de largura igual */
  gap: 20px;
  margin-top: 20px;
}
/* Estilos adicionais para mobile */
@media (max-width: 768px) {
  .Input {
    max-width: 90%;
    margin-top: 10vh;
  }

  .sticky-search {
    padding: 15px;
  }

  .search-link-btn,
  .search-link-btn-parceira {
    padding: 10px 15px;
  }
}

.filter-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
