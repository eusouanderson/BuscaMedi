const API_URL_SEARCH = process.env.NODE_ENV === 'development' 
    ? process.env.VUE_APP_API_URL_SEARCH_LOCAL 
    : process.env.VUE_APP_API_URL_SEARCH;

const API_URL_PRODUCTS = process.env.NODE_ENV === 'development' 
    ? process.env.VUE_APP_API_URL_PRODUCTS_LOCAL 
    : process.env.VUE_APP_API_URL_PRODUCTS;

export { API_URL_SEARCH, API_URL_PRODUCTS };
