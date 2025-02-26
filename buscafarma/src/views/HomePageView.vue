<template>
  <div class="Home" @click="clearSuggestions">
    <div :class="['Input', { 'sticky-search': medicines.length > 0 }]">
      <div class="py-2">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center text-blue-800 mb-4">
            Encontre o melhor preço para seus medicamentos
          </h2>
          <div class="max-w-md mx-auto relative">
            <input type="text" v-model="searchQuery" class="w-full p-4 border border-gray-300 rounded-lg text-sm"
              placeholder="Digite o nome do medicamento..." @input="handleInput" />
            <ul v-if="suggestions.length" class="suggestions-list">
              <li v-for="suggestion in suggestions" :key="suggestion._id" @click="selectMedicine(suggestion)">
                {{ suggestion.name }}
              </li>
            </ul>
            <div v-if="medicines.length" class="filter-container max-w-md mx-auto my-4">
              <label for="priceFilter" class="block text-sm text-gray-700">Ordenar por preço:</label>
              <select id="priceFilter" v-model="priceFilter" @change="sortMedicines"
                class="w-full p-2 border border-gray-300 rounded-lg">
                <option value="default">Selecione...</option>
                <option value="asc">Menor para Maior</option>
                <option value="desc">Maior para Menor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button @click="clearSearch" class="clear-btn">Limpar</button>
    </div>

    <div v-if="loading" class="loading">
      <font-awesome-icon icon="spinner" spin />
    </div>

    <div class="flex justify-center items-center w-full py-6" v-if="!searchQuery && !medicines.length">
      <ProductCarousel />
    </div>

    <div v-if="medicines.length" class="results">
      <div class="results-grid">
        <div v-for="medicine in medicines" :key="medicine._id" class="bg-white shadow-lg rounded-lg p-4 text-center">
          <img :src="medicine.image_url" :alt="medicine.name" class="w-32 h-32 object-contain mb-2" />
          <h4 class="text-sm font-semibold">{{ medicine.name }}</h4>
          <p class="text-xs text-gray-500">{{ medicine.manufacturer }}</p>
          <p class="text-xs text-gray-600">{{ medicine.offer }}</p>
          <p class="text-lg text-blue-800 font-bold">{{ medicine.price }}</p>
          <p class="text-xs text-gray-600">Disponibilidade: {{ medicine.availability }}</p>
          <button v-if="medicine.link" class="search-link-btn-parceira text-sm mt-2"
            @click="openSearchLink(medicine.link)">
            Farmacia Parceira
          </button>
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

    <Cart :cart="cart" @clearCart="clearCart" />
  </div>
</template>

<script>
import { searchMedicines } from '@/services/medicineService.js';
import ProductCarousel from '@/components/ui/ProductCarousel.vue';
import Cart from '@/components/ui/Cart.vue';

export default {
  name: 'HomeComponent',
  components: { Cart, ProductCarousel },
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
    async handleInput() {
      if (this.searchQuery.length < 3) {
        this.suggestions = [];
        this.medicines = [];
        return;
      }
      try {
        this.loading = true;
        const response = await searchMedicines(this.searchQuery);
        if (Array.isArray(response)) {
          this.suggestions = response.filter(med => med.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
          this.medicines = response;
        } else {
          this.suggestions = [];
          this.medicines = [];
        }
      } catch {
        this.error = "Erro ao buscar sugestões.";
      } finally {
        this.loading = false;
      }
    },
    sortMedicines() {
      if (this.priceFilter === 'asc') {
        this.medicines.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (this.priceFilter === 'desc') {
        this.medicines.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
    },
    selectMedicine(medicine) {
      this.searchQuery = medicine.name;
      this.suggestions = [];
      this.handleInput();
    },
    clearSearch() {
      this.searchQuery = '';
      this.medicines = [];
    },
    clearSuggestions() {
      this.suggestions = [];
    },
    addToCart(medicine) {
      this.cart.push(medicine);
    },
    clearCart() {
      this.cart = [];
    },
    openSearchLink(link) {
      if (link) window.open(link, '_blank');
    }
  }
};
</script>


<style scoped>
/* Layout principal */
.Home {
  background-image: url('@/assets/images/medicine.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  padding: 20px;
}

/* Input centralizado */
.Input {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-top: 20vh;
}

/* Input */
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

/* Quando a pesquisa estiver ativa, o input sobe para o header */
.input-active {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  z-index: 1100;
  transition: all 0.3s ease-in-out;
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

/* Botões de ação */
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

/* Grid de resultados */
.results {
  margin-top: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
}

/* Responsividade */
@media (max-width: 1024px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .Input {
    max-width: 90%;
    margin-top: 10vh;
  }

  .sticky-search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1000;
    padding: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .search-link-btn,
  .search-link-btn-parceira {
    padding: 10px 15px;
  }

  .results-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.filter-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
