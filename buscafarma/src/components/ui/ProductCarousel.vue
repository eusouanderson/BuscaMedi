<template>
  <div class="max-w-6xl mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center text-zinc-600">Últimos Medicamentos Adicionados</h2>
    <div class="relative overflow-hidden">
      <div class="flex animate-scroll-carousel">
        <div
          v-for="product in products"
          :key="product._id"
          class="flex-shrink-0 w-36 mr-5 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center"
        >
          <img
            :src="product.image_url"
            alt="Imagem do Produto"
            class="w-full h-24 object-cover rounded-t-lg mb-4"
          />
          <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ product.manufacturer }}</p>
          <p class="text-xl font-bold text-gray-900">{{ product.price }}</p>
          <a
            :href="product.search_link"
            target="_blank"
            class="text-blue-500 hover:underline mt-2 inline-block"
          >
            Ver mais
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMedicine } from "@/services/medicineService";

export default {
  name: "ProductCarousel",
  data() {
    return {
      products: []
    };
  },
  methods: {
    async fetchProducts() {
      const qtd = 10;
      const products = await getMedicine(qtd);
      this.products = products || [];
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
@keyframes scroll-carousel {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-scroll-carousel {
  display: flex;
  animation: scroll-carousel 20s linear infinite;
}
</style>
