const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      return res.json({ products: limitedProducts });
    }
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get products' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (product) {
      return res.json({ product });
    }
    res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get product' });
  }
});

module.exports = app;
