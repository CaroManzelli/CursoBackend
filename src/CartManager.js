const fs = require('fs');
const path = require('path');
const products = require('../products.json');

class CartManager {
    constructor() {
        this.cartProducts = [];
        this.loadProductsFromFile();
    }

    getCart() {
        return this.cartProducts;
    }

    addToCart(id) {
        const product = this.getProductById(id);

        if (product) {
            const productInCart = this.cartProducts.find((item) => item.id === product.id);

            if (!productInCart) {
                this.cartProducts.push({ id: product.id, quantity: 1 });
            } else {
                productInCart.quantity += 1;
            }

            this.saveProductsToFile();
        }
    }

    getProductById(id) {
        id = parseInt(id);
        const product = products.find((product) => product.id === id);

        if (!product) {
            console.log('Product not found');
        }

        return product;
    }

    loadProductsFromFile() {
        const cartFilePath = path.join(__dirname, '../cart.json');

        try {
            if (fs.existsSync(cartFilePath)) {
                const data = fs.readFileSync(cartFilePath, 'utf8');
                this.cartProducts = JSON.parse(data);
            } else {
                this.cartProducts = [];
                this.saveProductsToFile(); 
            }
        } catch (err) {
            console.error('Error loading products from file:', err);
        }
    }

    saveProductsToFile() {
        const cartFilePath = path.join(__dirname, '../cart.json'); 
        try {
            const data = JSON.stringify(this.cartProducts, null, 2);
            fs.writeFileSync(cartFilePath, data, 'utf8'); 
        } catch (err) {
            console.error('Error saving products to file:', err);
        }
    }
}

const cartManager = new CartManager();

module.exports = cartManager;
