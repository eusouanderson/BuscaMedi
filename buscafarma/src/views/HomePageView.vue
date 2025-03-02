<template>
  <div class="Home">
    <SearchInput :medicines="medicines" @update-medicines="updateMedicines" @search-medicines="searchMedicines"
      @search-error="setError" />

    <div v-if="loading" class="loading">
      <font-awesome-icon icon="spinner" spin />
    </div>

    <SearchResults :medicines="medicines" @add-to-cart="addToCart" />

    <div v-if="error" class="text-red-600 text-center mt-4">
      {{ error }}
    </div>

    <Cart :cart="cart" @clearCart="clearCart" />
  </div>
</template>

<script>
import SearchInput from '@/components/ui/SearchInput.vue';
import SearchResults from '@/components/ui/SearchResults.vue';
import Cart from '@/components/ui/Cart.vue';
import { searchMedicines } from '@/services/medicineService.js';

export default {
  name: 'HomePage',
  components: { SearchInput, SearchResults, Cart },
  data() {
    return {
      medicines: [],
      error: null,
      cart: [],
      loading: false
    };
  },
  methods: {
    async searchMedicines(query) {
      this.loading = true;
      try {
        return await searchMedicines(query);
      } catch {
        this.setError("Erro ao buscar medicamentos.");
      } finally {
        this.loading = false;
      }
    },
    updateMedicines(medicines) {
      this.medicines = medicines;
    },
    setError(errorMsg) {
      this.error = errorMsg;
    },
    addToCart(medicine) {
      this.cart.push(medicine);
    },
    clearCart() {
      this.cart = [];
    }
  }
};
</script>


<style scoped>
/* Layout principal */
@keyframes backgroundSlide {
  0% {
    background-image: url('@/assets/images/medicine_1.jpg');
  }

  50% {
    background-image: url('@/assets/images/medicine_2.jpg');
  }

  100% {
    background-image: url('@/assets/images/medicine_1.jpg');
  }
}

.Home {
  animation: backgroundSlide 10s infinite alternate;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  padding: 20px;
  transition: background-image 1s ease-in-out;
  box-shadow: 0px 0px 100px 50px rgba(0, 0, 255, 0.5);
}








</style>
