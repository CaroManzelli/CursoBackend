const { Router } = require('express');
const cartManager = require('./CartManager');
const router = Router();

router.get('/cart', (req, res) => {
    const { query } = req;
    const { limit } = query;
    if (!limit) {
      res.json(cartManager.getCart());
    } else {
      const result = cartManager.getCart().filter((product) => product.id <= parseInt(limit));
      res.json(result);
    }
  });

router.get('/cart/:productId', (req, res) => {
    const { productId } = req.params;
    const product = cartManager.getProductById(productId);
  
    if (!product) {
      res.json({ error: 'Product not found.' });
    } else {
      res.json(product);
    }
  });

router.post('/cart', (req, res) => {
    const { body } = req;
    if (body.id) { 
      cartManager.addToCart(body.id); 
      res.status(201).json({ message: 'Product added to cart' });
    } else {
      res.status(400).json({ error: 'Product id is required.' });
    }
  });

module.exports = router;
