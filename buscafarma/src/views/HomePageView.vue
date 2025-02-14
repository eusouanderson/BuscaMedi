<template>
  <div class="Home">
    <!-- Formulário de busca -->
    <div 
      :class="['Form', { 'sticky-search': isScrolled && !isMinimized, 'minimized': isMinimized }]"
    >
      <div class="bg-gray-100 py-2">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center text-blue-800 mb-2">
            Encontre o melhor preço para seus medicamentos
          </h2>
          <div class="max-w-md mx-auto relative">
            <input
              type="text"
              v-model="searchQuery"
              class="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Exemplo: Paracetamol, Ibuprofeno..."
              @input="searchMedicines"
            />
            <button
              @click="searchMedicines"
              class="w-full mt-2 p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <button 
        @click="toggleMinimized"
        class="absolute top-2 right-2 p-2 bg-blue-800 text-white rounded-full"
      >
        {{ isMinimized ? 'Maximizar' : 'Minimizar' }}
      </button>
    </div>

    <!-- Resultados de busca -->
    <div v-if="medicines.length > 0" 
         :style="{ marginTop: isScrolled ? '120px' : '120px' }" 
         class="container mx-auto px-4 py-6">
      <h3 class="text-2xl font-semibold text-blue-800 mb-4 text-center">Resultados encontrados</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="medicine in medicines"
          :key="medicine._id"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
        >
          <img :src="medicine.image_url" :alt="medicine.name" class="w-24 h-24 object-contain mb-3" />
          <h4 class="text-lg font-semibold text-center">{{ medicine.name }}</h4>
          <p class="text-sm text-gray-500">{{ medicine.manufacturer }}</p>
          <p class="text-lg text-blue-800 font-bold">{{ medicine.price }}</p>
          <p class="text-sm text-gray-600">{{ medicine.offer }}</p>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-red-600 text-center mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { searchMedicines } from '@/services/medicineService';

export default {
  name: 'HomeComponent',
  data() {
    return {
      searchQuery: '',
      medicines: [],
      error: null,
      isScrolled: false,
      isMinimized: false,
    };
  },
  methods: {
    async searchMedicines() {
      if (!this.searchQuery.trim()) {
        this.medicines = [];
        return;
      }

      this.error = null;

      try {
        this.medicines = await searchMedicines(this.searchQuery);
      } catch (err) {
        this.error = 'Erro ao buscar medicamentos.';
      }
    },
    handleScroll() {
      if (!this.isMinimized) {
        this.isScrolled = window.scrollY > 100;
      }
    },
    toggleMinimized() {
      this.isMinimized = !this.isMinimized;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.Home {
  background-image: url('@/assets/images/medicine.jpg');
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.Form {
  background-color: rgba(255, 255, 255, 0.9);
  
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  position: relative;
  transition: all 0.3s ease;
}

.sticky-search {
  position: relative;
  top: 88px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 50%;
  z-index: 50;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  transition: top 0.3s ease, padding 0.3s ease, width 0.3s ease;
  max-height: calc(100vh - 88px);
}

/* Estilo quando o formulário está minimizado */
.Form.minimized {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 200px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.container {
  max-width: 100%;
  transition: margin-top 0.3s ease;
  padding-top: 20px;
}

.container + .container {
  margin-top: 20px;
}

.container .grid {
  margin-top: 20px;
}
</style>
