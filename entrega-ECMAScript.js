class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
   const productExists = this.products.find(product => product.code === code);
    if (productExists) {
      console.log('Product with the same code already exists');
      return;
    }    
    const id = this.products.length + 1;

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
  }

  getProductById(productId) {
        productId = parseInt(productId);

    const product = this.products.find(product => product.id === productId);
    if (!product) {
      console.log('Product not found');
    }
    return product;
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());
productManager.addProduct("Alysa", "campera de abrigo", 5000, "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/c/a/campera-de-abrigo-con-capucha-topper-puffer-ii-ni-a-rosa-800020165692001-1.jpg", "alysa", 25);
console.log(productManager.getProducts());
productManager.addProduct("Alysa", "campera de abrigo", 5000, "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/c/a/campera-de-abrigo-con-capucha-topper-puffer-ii-ni-a-rosa-800020165692001-1.jpg", "alysa", 25);
productManager.addProduct("Matt", "campera de abrigo", 4000, "https://www.solodeportes.com.ar/campera-de-abrigo-con-capucha-atomik-toronto-ni-o-azul.html", "matt", 15);
console.log(productManager.getProducts());
console.log(productManager.getProductById(1)); 
console.log(productManager.getProductById(3)); 