const ProductManager = require('./ProductManager');

(async () => {
    const productManager = new ProductManager('./products.json');

    try {
        await productManager.addProduct({
            title: 'Mexilhão',
            description: 'Frutos do Mar',
            price: 90,
            thumbnail: 'path/to/image3.jpg',
            code: 'FRUTDM080',
            stock: 80
        });
        console.log('Produto adicionado');

        const products = await productManager.getProducts();
        console.log('Produtos:', products);

        const product = await productManager.getProductById(2);
        console.log('Produto pelo ID:', product);

        await productManager.updateProduct(2, { price: 54 });
        console.log('Produto atualizado');

        const updatedProduct = await productManager.getProductById(2);
        console.log('Produto atualizado pelo ID:', updatedProduct);

        await productManager.deleteProduct();
        console.log('Produto deletado');

        const productsAfterDeletion = await productManager.getProducts(2);
        console.log('Produtos após exclusão:', productsAfterDeletion);
    } catch (error) {
        console.error('Erro:', error);
    }
})();
