const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor() {
    this.filePath = path.resolve(__dirname, '../products.json');
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading products file:', error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error('Error getting product by ID:', error);
      return null;
    }
  }
}

module.exports = ProductManager;
