<template>
  <div class="carousel-container max-w-6xl mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center text-zinc-600">Ultimos Medicamentos Adicionados</h2>
    <div class="carousel-wrapper">
      <div class="carousel">
        <div
          v-for="product in products"
          :key="product._id"
          class="product-item p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            :src="product.image_url"
            alt="Imagem do Produto"
            class="product-image w-full h-24 object-cover rounded-t-lg mb-4"
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
      const qtd = 10; // quantidade de produtos
      const products = await getMedicine(qtd); // Chama o serviço para buscar os produtos
      this.products = products || []; // Atualiza a lista de produtos
    }
  },
  mounted() {
    this.fetchProducts(); // Carrega os produtos ao montar o componente
  }
};
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  overflow: hidden;
}

.carousel {
  display: flex;
  animation: scroll-carousel 20s linear infinite;
}

.product-item {
  flex-shrink: 0;
  width: 150px; /* Tamanho pequeno para o produto */
  margin-right: 20px;
  text-align: center;
}

.product-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
/* Animação do carrossel: mover para a esquerda e voltar para a direita */
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

</style>
