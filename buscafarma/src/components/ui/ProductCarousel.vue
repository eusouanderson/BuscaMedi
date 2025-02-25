<template>
  <div class="carousel-container max-w-6xl mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center">Carrossel de Produtos</h2>
    <vue-slick-carousel :options="slickOptions" v-if="products.length">
      <div 
        v-for="product in products" 
        :key="product._id" 
        class="product-item p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <img 
          :src="product.image_url" 
          alt="Imagem do Produto" 
          class="product-image w-full h-48 object-cover rounded-t-lg mb-4"
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
    </vue-slick-carousel>
  </div>
</template>

<script>
import { getMedicine } from "@/services/medicineService"; // Importe o método do serviço
import VueSlickCarousel from 'vue-slick-carousel'; // Importação correta

// Adicione o CSS do Slick Carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default {
  name: 'ProductCarousel',  
  components: {
    VueSlickCarousel
  },
  data() {
    return {
      products: [],
      slickOptions: {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    };
  },
  methods: {
    async fetchProducts() {
      const qtd = 10; // quantidade de produtos
      const products = await getMedicine(qtd); // Chama o serviço para buscar os produtos
      this.products = products; // Atualiza a lista de produtos
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
/* Nenhum estilo adicional é necessário com Tailwind CSS */
</style>
