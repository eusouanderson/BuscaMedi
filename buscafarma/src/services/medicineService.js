import axios from 'axios';

const API_URL_SEARCH = process.env.VUE_APP_API_URL_SEARCH;
const API_URL_PRODUCTS = process.env.VUE_APP_API_URL_PRODUCT

export async function searchMedicines(query) {
  if (!query.trim()) return [];

  try {
    const response = await axios.get(`${API_URL_SEARCH}${encodeURIComponent(query)}`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    return [];
  }
}

export async function getMedicine(qtd) {
  if (isNaN(qtd) || qtd <= 0) return [];  

  try {
    
    const response = await axios.get(`${API_URL_PRODUCTS}${qtd}`);
    return response.data;  
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];  
  }
}
