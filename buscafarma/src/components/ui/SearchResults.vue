<template>
    <div v-if="medicines.length" class="results">
        <div class="results-grid">
            <div v-for="medicine in medicines" :key="medicine._id"
                class="bg-white shadow-lg rounded-lg p-4 text-center">
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
</template>

<script>
export default {
    name: 'SearchResults',
    props: ['medicines'],
    methods: {
        openSearchLink(link) {
            if (link) window.open(link, '_blank');
        },
        addToCart(medicine) {
            this.$emit('add-to-cart', medicine);
        }
    }
};
</script>

<style scoped>
/* Estilização da lista de resultados */
.results {
    width: 100%;
    max-width: 1200px;
    /* Aumentei o limite máximo */
    margin-top: 20px;
    padding: 0 10px;
    /* Adicionando padding para evitar que o conteúdo vá até as bordas */
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Ajustei para garantir um mínimo de 250px por item */
    gap: 16px;
}

.search-link-btn-parceira,
.search-link-btn {
    background-color: #4189e1;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    margin-top: 8px;
}

.add-to-cart-btn {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-top: 8px;
}

/* Responsividade */
@media (max-width: 1200px) {
    .results-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        /* Ajustando o número de colunas em telas menores */
    }
}

@media (max-width: 768px) {
    .results-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        /* Mais colunas em telas menores */
    }

    .results {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .results-grid {
        grid-template-columns: 1fr;
        /* Uma coluna para telas muito pequenas */
    }

    .results {
        padding: 0 5px;
    }
}
</style>
