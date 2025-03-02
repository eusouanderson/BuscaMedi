<template>
    <header class="Header">
        <div class="max-w-4xl mx-auto px-4 py-2">
            <div class="header-content">
                <h2 v-if="medicines && !medicines.length"
                    class="texto text-2xl font-semibold text-center text-blue-800 mb-4">
                    Encontre o melhor preço para seus medicamentos
                </h2>

                <ul v-if="suggestions && suggestions.length" class="suggestions-list">
                    <li v-for="suggestion in suggestions" :key="suggestion._id" @click="selectMedicine(suggestion)">
                        {{ suggestion.name }}
                    </li>
                </ul>

                <div v-if="medicines && medicines.length" class="filter-container my-4">
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
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn">Limpar</button>
        
    </header>
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
            isSticky: false,
            isSearchVisible: false,
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
                this.$emit('update-medicines', []); // Atualiza medicamentos
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

            const sortedMedicines = [...this.medicines].sort((a, b) => {
                const priceA = parseFloat(a.price.replace("R$ ", "").replace(",", "."));
                const priceB = parseFloat(b.price.replace("R$ ", "").replace(",", "."));

                if (isNaN(priceA) || isNaN(priceB)) return 0;

                return this.priceFilter === 'asc'
                    ? priceA - priceB
                    : priceB - priceA;
            }).map(m => ({
                ...m,
                price: `R$ ${parseFloat(m.price.replace("R$ ", "").replace(",", ".")).toFixed(2).replace(".", ",")}`,
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
.Header {
    background-color: white;
    padding: 15px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-input:focus {
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
    margin-top: 10px;
}

@media (max-width: 768px) {
    .Header {
        padding: 10px;
    }

    .search-input {
        padding: 10px;
        font-size: 16px;
    }

    .filter-container {
        width: 100%;
        padding: 0 15px;
    }

    .clear-btn {
        width: 100%;
        margin-top: 15px;
    }
}
</style>
