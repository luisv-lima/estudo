class ProductManager {
	constructor() {
	  this.products = [];
	  this.productIdCounter = 1;
	}
  
	addProduct(title, description, price, thumbnail, code, stock) {
	  
	  if (!title || !description || !price || !thumbnail || !code || !stock) {
		console.error("Todos os campos são obrigatórios.");
		return;
	  }
  
	  const existingProduct = this.products.find(product => product.code === code);
	  if (existingProduct) {
		console.error("O código do produto já existe.");
		return;
	  }
  
	  const newProduct = {
		id: this.productIdCounter++,
		title: title,
		description: description,
		price: price,
		thumbnail: thumbnail,
		code: code,
		stock: stock
	  };
  
	  this.products.push(newProduct);
	  console.log("Produto adicionado com sucesso:", newProduct);
	}
  
	getProductById(id) {
	  const product = this.products.find(product => product.id === id);
	  if (product) {
		console.log("Produto encontrado:", product);
	  } else {
		console.error("Produto não encontrado.");
	  }
	}
  }
  
  const productManager = new ProductManager();
  
  productManager.addProduct("Camisa", "Vestuário", 42.99, "imagem1.jpg", "VEST801", 200);
  productManager.addProduct("Calça", "Vestuário", 189.99, "imagem2.jpg", "VEST901", 100);
  productManager.addProduct("Microondas", "Eletrodoméstico", 599.90, "imagem3.jpg", "ELETRO502", 50);
  productManager.addProduct("Laranja", "Hortifruti", 6.99, "imagem4.jpg", "HF001", 3000);
  
  productManager.getProductById(1);
  productManager.getProductById(2);
  productManager.getProductById(3); 
  productManager.getProductById(4);
  productManager.getProductById(5);
