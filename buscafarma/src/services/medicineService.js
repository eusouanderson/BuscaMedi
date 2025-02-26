import axios from 'axios';
import { API_URL_SEARCH, API_URL_PRODUCTS } from '@/config'; 

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
