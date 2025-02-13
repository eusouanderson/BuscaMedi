<template>
    <div class="Form min-h-screen flex flex-col">
        <!-- Formulário de busca -->
        <div class="bg-gray-100 py-10">
            <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-center text-blue-800 mb-6">Encontre o melhor preço para seus medicamentos</h2>
            <div class="max-w-2xl mx-auto relative">
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
        

        <!-- Resultados de busca -->
        <div v-if="medicines.length > 0" class="container mx-auto px-4 py-6">
        <h3 class="text-2xl font-semibold text-blue-800 mb-4">Resultados encontrados</h3>
        <div v-for="(medicine, index) in medicines" :key="index" class="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div class="flex justify-between items-center">
            <h4 class="text-xl font-semibold">{{ medicine.name }}</h4>
            <p class="text-lg text-blue-800">{{ medicine.price | currency }}</p>
            </div>
            <p class="text-sm text-gray-600">Farmácia: {{ medicine.pharmacyName }}</p>
            <p class="text-sm text-gray-600">Endereço: {{ medicine.pharmacyAddress }}</p>
            <button
            @click="redirectToPharmacy(medicine.pharmacyLink)"
            class="mt-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
            Visite a Farmácia
            </button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  data() {
    return {
      searchQuery: '',
      medicines: [],
    };
  },
  methods: {
    searchMedicines() {
      if (this.searchQuery.trim() === '') {
        this.medicines = [];
      } else {
        this.medicines = [
          {
            name: 'Paracetamol',
            price: 5.99,
            pharmacyName: 'Farmácia Saúde',
            pharmacyAddress: 'Rua da Saúde, 123',
            pharmacyLink: 'https://www.farmaciasaude.com.br',
          },
          {
            name: 'Ibuprofeno',
            price: 8.99,
            pharmacyName: 'Farmácia Bem Estar',
            pharmacyAddress: 'Avenida Bem Estar, 45',
            pharmacyLink: 'https://www.farmaciabemestar.com.br',
          }
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
  background-image: url('@/assets/images/medicine.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}

.Form {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
