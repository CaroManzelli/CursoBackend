const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
    this.loadProductsFromFile(); 
  }

  getProducts() {
    return this.products;
  }

  addProduct({
    title = "",
    description = "",
    status = true,
    category ="",
    price = 0,
    thumbnail = "",
    code = "",
    stock = 0,
  }) {
    const productExists = this.products.find((product) => product.code === code);
    if (productExists) {
      console.log('Product with the same code already exists');
      return;
    }
  
    const id = +this.productIdCounter;
  
    const newProduct = {
      id,
      title,
      description,
      status,
      category,
      price,
      thumbnail,
      code,
      stock,
    }; if (!title || !description || !category || !price || !code || !stock) {
      console.log('Missing required fields for the product');
      return;
    }
  
    this.products.push(newProduct);
    this.productIdCounter++; 
    this.saveProductsToFile();
  }
  

  getProductById(productId) {
    productId = parseInt(productId);

    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      console.log('Product not found');
    }
    return product;
  }

  deleteProduct(productId) {
    productId = parseInt(productId);

    const index = this.products.findIndex((product) => product.id === productId);
    if (index === -1) {
      console.log('Product not found');
      return;
    }

    this.products.splice(index, 1);
    this.saveProductsToFile(); 
  }

  updateProduct(productId, updatedProductData) {
    productId = parseInt(productId);

    const index = this.products.findIndex((product) => product.id === productId);
    if (index === -1) {
      console.log('Product not found');
      return;
    }

    this.products[index] = { ...this.products[index], ...updatedProductData };
    this.saveProductsToFile(); 
  }

  loadProductsFromFile() {
  try {
    const data = fs.readFileSync('./products.json', 'utf8');
    this.products = JSON.parse(data);
    this.productIdCounter = Math.max(0, ...this.products.map((product) => product.id)) + 1;
  } catch (err) {
    this.products = [];
    this.productIdCounter = 1; 
    console.error('Error loading products from file:', err);
  }
}

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync('./products.json', data, 'utf8');

    } catch (err) {
      console.error('Error saving products to file:', err);
    }
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());
productManager.addProduct({
  title: "Alysa",
  category: "camperas",
  description: "campera de abrigo",
  price: 5000,
  thumbnail: "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/c/a/campera-de-abrigo-con-capucha-topper-puffer-ii-ni-a-rosa-800020165692001-1.jpg",
  code: "alysa",
  stock: 25,
});
console.log(productManager.getProducts());
productManager.addProduct({
  title: "Matt",
  category: "camperas",
  description: "campera de abrigo",
  price: 4000,
  thumbnail: "https://www.solodeportes.com.ar/campera-de-abrigo-con-capucha-atomik-toronto-ni-o-azul.html",
  code: "matt",
  stock: 15,
});

console.log(productManager.getProducts());

console.log(productManager.getProductById(2));

productManager.addProduct({
  title: "Leah",
  category: "calzas",
  description: "calza deportiva",
  price: 4000,
  thumbnail: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwad3c88e4/products/NB_2L020004550/NB_2L020004550-1.JPG",
  code: "leah",
  stock: 10,
});

productManager.addProduct({
  title: "Jack",
  description: "remera manga corta",
  category: "remeras",
  price: 3000,
  thumbnail: "https://sporting.vtexassets.com/arquivos/ids/649266-1200-1200?v=638013553876070000&width=1200&height=1200&aspect=true",
  code: "jack",
  stock: 50,
});

productManager.addProduct({
  title: "Peter",
  description: "remera manga larga",
  category: "remeras",
  price: 4000,
  thumbnail: "https://http2.mlstatic.com/D_NQ_NP_764260-MLA51087512383_082022-O.webp",
  code: "peter",
  stock: 20,
});

module.exports = productManager;