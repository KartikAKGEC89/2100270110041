const axios = require("axios");

const listProducts = async (company, category, minPrice, maxPrice) => {
  const TEST_SERVER_URL = `http://20.244.56.144/products/companies/${company}/categories/${category}/products`;
  try {
    const response = await axios.get(TEST_SERVER_URL, {
      params: { top: 10, minPrice, maxPrice },
    });
    return response.data.products || [];
  } catch (error) {
    console.error(`Error fetching products from ${company}:`, error.message);
    return [];
  }
};

module.exports = listProducts;
