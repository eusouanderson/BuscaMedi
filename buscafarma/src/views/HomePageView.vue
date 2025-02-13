<template>
    <div class="Home">
        <div class="Form min-h-[30vh] flex flex-col justify-center">
            <!-- Formulário de busca -->
            <div class="bg-gray-100 py-8">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-semibold text-center text-blue-800 mb-4">
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
                            class="w-full mt-4 p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Resultados de busca -->
        <div v-if="medicines.length > 0" class="container mx-auto px-4 py-6">
            <h3 class="text-2xl font-semibold text-blue-800 mb-4 text-center">Resultados encontrados</h3>
            
            <!-- Grid responsivo -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                    v-for="(medicine, index) in medicines"
                    :key="index"
                    v-motion
                    :initial="{ x: 100, opacity: 0 }"
                    :enter="{ x: 0, opacity: 1 }"
                    :delay="index * 150"
                    class="bg-white shadow-lg rounded-lg p-4"
                >
                    <div class="flex justify-between items-center">
                        <h4 class="text-lg font-semibold">{{ medicine.name }}</h4>
                        <p class="text-lg text-blue-800">{{ formatCurrency(medicine.price) }}</p>
                    </div>
                    <p class="text-sm text-gray-600">Farmácia: {{ medicine.pharmacyName }}</p>
                    <p class="text-sm text-gray-600">Endereço: {{ medicine.pharmacyAddress }}</p>
                    <button
                        @click="redirectToPharmacy(medicine.pharmacyLink)"
                        class="mt-3 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
                    >
                        Visite a Farmácia
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { vMotion } from '@vueuse/motion'

export default {
  name: 'HomeComponent',
  directives: {
    motion: vMotion,
  },
  data() {
    return {
      searchQuery: '',
      medicines: [],
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    },
    searchMedicines() {
      if (this.searchQuery.trim() === '') {
        this.medicines = [];
      } else {
        this.medicines = [
          { name: 'Paracetamol', price: 5.99, pharmacyName: 'Farmácia Saúde', pharmacyAddress: 'Rua da Saúde, 123', pharmacyLink: 'https://www.farmaciasaude.com.br' },
          { name: 'Ibuprofeno', price: 8.99, pharmacyName: 'Farmácia Bem Estar', pharmacyAddress: 'Avenida Bem Estar, 45', pharmacyLink: 'https://www.farmaciabemestar.com.br' },
          { name: 'Dipirona', price: 6.50, pharmacyName: 'Farmácia Vida', pharmacyAddress: 'Rua da Vida, 78', pharmacyLink: 'https://www.farmaciavida.com.br' },
          { name: 'Aspirina', price: 4.99, pharmacyName: 'Farmácia da Saudade', pharmacyAddress: 'Avenida da Saudade, 321', pharmacyLink: 'https://www.farmaciadasaudade.com.br' }
        ];
      }
    },
    redirectToPharmacy(link) {
      window.open(link, '_blank');
    }
  }
}
</script>

<style scoped>
.Home {
    background-image: url('~@/assets/images/medicine.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.Form {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: auto ;
}
</style>
