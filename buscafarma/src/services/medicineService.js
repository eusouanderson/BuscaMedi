import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export async function searchMedicines(query) {
  if (!query.trim()) return [];

  try {
    const response = await axios.get(`${API_URL}${encodeURIComponent(query)}`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    return [];
  }
}
