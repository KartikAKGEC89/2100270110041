const arrangeProducts = (products, sortBy, sortOrder) => {
  return products.sort((x, y) => {
    if (sortOrder === "asc") {
      return x[sortBy] - y[sortBy];
    } else {
      return y[sortBy] - x[sortBy];
    }
  });
};

module.exports = arrangeProducts;