<template>
    <div class="Input" :class="{ 'sticky-search': isSticky && medicines.length > 0 }" @click="closeSuggestions">
        <div class="py-2">
            <div class="max-w-4xl mx-auto px-4">
                <h2 v-if="!medicines.length" class="texto text-3xl font-semibold text-center text-blue-800 mb-4">
                    Encontre o melhor preço para seus medicamentos
                </h2>
                <div class="max-w-md mx-auto relative">
                    <input type="text" v-model="searchQuery"
                        class="w-full p-4 border border-gray-300 rounded-lg text-sm"
                        placeholder="Digite o nome do medicamento..." @input="handleInput" @click.stop />

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
</template>

<script>
import { searchMedicines } from '@/services/medicineService.js';

export default {
    name: 'SearchInput',
    props: ['medicines'],
    data() {
        return {
            searchQuery: '',
            suggestions: [],
            priceFilter: 'default',
            loading: false,
            isSticky: false, // Controla se o input deve ser sticky
            isSearchVisible: false, // Controla a visibilidade do campo de input
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener("click", this.closeSuggestions);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener("click", this.closeSuggestions);
    },
    methods: {
        toggleSearch() {
            this.isSearchVisible = !this.isSearchVisible;
            if (!this.isSearchVisible) {
                this.clearSearch();  // Limpa a busca quando o campo é fechado
            }
        },
        async handleInput() {
            if (this.searchQuery.length < 3) {
                this.suggestions = [];
                this.$emit('update-medicines', []);
                return;
            }

            try {
                this.loading = true;
                const response = await searchMedicines(this.searchQuery);

                if (Array.isArray(response)) {
                    this.suggestions = response.filter(med =>
                        med.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );
                    this.$emit('update-medicines', this.suggestions);
                } else {
                    this.suggestions = [];
                    this.$emit('update-medicines', []);
                }
            } catch (error) {
                console.error("Erro ao buscar sugestões:", error);
                this.suggestions = [];
                this.$emit('update-medicines', []);
            } finally {
                this.loading = false;
            }
        },

        sortMedicines() {
            if (!Array.isArray(this.medicines) || this.medicines.length === 0) return;

            const sortedMedicines = [...this.medicines]
                .map(m => ({
                    ...m,
                    numericPrice: parseFloat(m.price.replace("R$ ", "").replace(",", ".")),
                }))
                .filter(m => !isNaN(m.numericPrice))
                .sort((a, b) => this.priceFilter === 'asc'
                    ? a.numericPrice - b.numericPrice
                    : b.numericPrice - a.numericPrice
                )
                .map(({ numericPrice, ...m }) => ({
                    ...m,
                    price: `R$ ${numericPrice.toFixed(2).replace(".", ",")}`,
                }));

            this.$emit('update-medicines', sortedMedicines);
        },

        selectMedicine(medicine) {
            this.searchQuery = medicine.name;
            this.suggestions = [];
            this.handleInput();
        },

        clearSearch() {
            this.searchQuery = '';
            this.suggestions = [];
            this.$emit('update-medicines', []);
        },

        closeSuggestions(event) {
            if (!this.$el.contains(event.target)) {
                this.suggestions = [];
            }
        },

        handleScroll() {
            this.isSticky = window.scrollY > 50;
        }
    }
};
</script>

<style scoped>
.Input {
    position: relative;
    background-color: white;
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}

.search-icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input-container {
    position: relative;
    display: block;
}

.sticky-search {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.38);
    /* Fundo transparente */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 15px 30px;
    max-width: 450px;
}

/* Estilo do input dentro do sticky */
.sticky-search input {
    padding: 8px 12px;
    font-size: 14px;
    height: 40px;
}



.Input input:focus {
    border-color: #4b9a2f;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 162, 255, 0.7);
}

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
    padding: 0;
    margin-top: 5px;
    z-index: 1000;
}

.suggestions-list li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
}

.suggestions-list li:hover {
    background: #f1f1f1;
}

.clear-btn {
    background-color: #ff4d4d;
    color: white;
    padding: 8px 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 15px;
}
</style>
