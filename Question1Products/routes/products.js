const express = require("express");
const { v4: uuidv4 } = require("uuid");
const listProducts = require("../utils/listProducts");
const arrangeProducts = require("../utils/arrangeProducts");

const router = express.Router();

const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = [
  "Phone",
  "Computer",
  "TV",
  "Earphone",
  "Tablet",
  "Charger",
  "Mouse",
  "Keypad",
  "Bluetooth",
  "Pendrive",
  "Remote",
  "Speaker",
  "Headset",
  "Laptop",
  "PC",
];

router.get("/:categoryname/products", async (req, res) => {
  const { categoryname } = req.params;
  const { n, minPrice, maxPrice, sortBy, sortOrder, page = 1 } = req.query;

  if (!CATEGORIES.includes(categoryname)) {
    return res.status(400).json({ error: "Invalid category name" });
  }

  const numProducts = parseInt(n);
  if (!numProducts || isNaN(numProducts) || numProducts <= 0) {
    return res.status(400).json({ error: "Invalid value for n" });
  }

  try {
    let allProducts = [];
    for (const company of COMPANIES) {
      const products = await listProducts(company, categoryname, minPrice, maxPrice);
      products.forEach(product => (product.id = uuidv4()));
      allProducts = allProducts.concat(products);
    }

    if (sortBy && sortOrder) {
      allProducts = arrangeProducts(allProducts, sortBy, sortOrder);
    }

    const totalProducts = allProducts.length;
    const pageSize = Math.min(numProducts, 10);
    const offset = (page - 1) * pageSize;
    const paginatedProducts = allProducts.slice(offset, offset + pageSize);

    res.json({
      totalProducts,
      products: paginatedProducts,
    });
  } catch (error) {
    console.error(`Error processing request:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:categoryname/products/:productid", async (req, res) => {
  const { categoryname, productid } = req.params;

  if (!CATEGORIES.includes(categoryname)) {
    return res.status(400).json({ error: "Invalid category name" });
  }

  try {
    let product;
    for (const company of COMPANIES) {
      const products = await listProducts(company, categoryname);
      product = products.find(p => p.id === productid);
      if (product) break;
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(`Error processing request:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;