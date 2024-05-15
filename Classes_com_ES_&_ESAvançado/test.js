const ProductManager = require('./ProductManager'); // Importar o código que queremos testar

describe('ProductManager', () => {
  let productManager;

  beforeEach(() => {
    productManager = new ProductManager(); // Criar uma nova instância de ProductManager antes de cada teste
  });

  test('Adição de Produto', () => {
    productManager.addProduct("Camisa", "Vestuário", 42.99, "imagem1.jpg", "VEST801", 200);
    expect(productManager.products.length).toBe(1);
    // Adicione mais testes aqui para verificar se os produtos foram adicionados corretamente
  });

  test('Verificação de Campos Obrigatórios', () => {
    productManager.addProduct("Calça", null, 189.99, "imagem2.jpg", "VEST901", 100);
    expect(console.error).toHaveBeenCalledWith("Todos os campos são obrigatórios.");
    // Adicione mais testes aqui para verificar o tratamento de campos obrigatórios
  });

  test('Verificação de Código de Produto Existente', () => {
    productManager.addProduct("Microondas", "Eletrodoméstico", 599.90, "imagem3.jpg", "ELETRO502", 50);
    productManager.addProduct("Microondas", "Eletrodoméstico", 599.90, "imagem3.jpg", "ELETRO502", 50);
    expect(console.error).toHaveBeenCalledWith("O código do produto já existe.");
    // Adicione mais testes aqui para verificar a verificação de código de produto existente
  });

  test('Busca por ID de Produto', () => {
    productManager.addProduct("Laranja", "Hortifruti", 6.99, "imagem4.jpg", "HF001", 3000);
    const productId = 1;
    productManager.getProductById(productId);
    expect(console.log).toHaveBeenCalledWith(`Produto encontrado: {id: ${productId}, ...}`);
    // Adicione mais testes aqui para verificar a busca por ID de produto
  });

  // Adicione mais testes conforme necessário para cobrir outros casos de uso
});
