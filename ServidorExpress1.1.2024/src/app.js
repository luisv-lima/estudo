const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 3000;

const productManager = new ProductManager('./src/products.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h1>🎯 Bem-vindo à API de Produtos!</h1>
        <p>Endpoints disponíveis:</p>
        <ul>
            <li><a href="/products">/products</a> - Listar todos os produtos</li>
            <li><a href="/products?limit=1">/products?limit=1</a> - Listar produtos com limite</li>
            <li>/products/:pid - Buscar produto por ID</li>
        </ul>
    `);
});

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        let products = await productManager.getProducts();

        if (limit) {
            products = products.slice(0, parseInt(limit, 10));
        }

        res.json({ products });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productId = parseInt(pid, 10);

        const product = await productManager.getProductById(productId);

        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar produto pelo ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
