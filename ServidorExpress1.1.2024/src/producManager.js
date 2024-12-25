const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.filePath = path.resolve(filePath);
    }

    async _readFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                console.error('Error reading file:', error);
                throw error;
            }
        }
    }

    async _writeFile(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error writing file:', error);
            throw error;
        }
    }

    async addProduct(product) {
        const products = await this._readFile();
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id, ...product };
        products.push(newProduct);

        await this._writeFile(products);
        console.log('Produto cadastrado com sucesso');
    }

    async getProducts() {
        return await this._readFile();
    }

    async getProductById(id) {
        const products = await this._readFile();
        return products.find(p => p.id === id) || null;
    }

    async updateProduct(id, updatedProduct) {
        const products = await this._readFile();
        const index = products.findIndex(p => p.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            await this._writeFile(products);
            console.log(`Produto com id ${id} atualizado com sucesso`);
        } else {
            console.log(`Produto com id ${id} não encontrado`);
        }
    }

    async deleteProduct(id) {
        const products = await this._readFile();
        const updatedProducts = products.filter(p => p.id !== id);

        if (products.length !== updatedProducts.length) {
            await this._writeFile(updatedProducts);
            console.log(`Produto com id ${id} deletado com sucesso`);
        } else {
            console.log(`Produto com id ${id} não encontrado`);
        }
    }
}

module.exports = ProductManager;
