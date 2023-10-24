const { Router } = require('express');
const productManager = require('./ProductManager');
const router = Router();

router.get('/products', (req, res) => {
    const { query } = req;
    const { limit } = query;
    if (!limit) {
      res.json(productManager.getProducts());
    } else {
      const result = productManager.getProducts().filter((product) => product.id <= parseInt(limit));
      res.json(result);
    }
  });

router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const product = productManager.getProductById(productId);
  
    if (!product) {
      res.json({ error: 'Product not found.' });
    } else {
      res.json(product);
    }
  });

router.post('/products', (req, res) => {
    const { body } = req;
    const newProduct = {
      ...body,
      id: productManager.productIdCounter,
    };
    productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
  });

  router.put('/products/:productId',(req, res)=>{
    const { body } = req;
    const { productId } = req.params;
    
     const product = productManager.getProductById(productId);

     if (!product) {
         res.status(404).json({ error: 'Product not found.' });
     } else {
    
         const updatedProduct = {
             ...product,
             ...body,
         };
 
         
         productManager.updateProduct(productId, updatedProduct);
 
         res.status(200).json(updatedProduct);
     }
 });
  router.delete('/products/:productId',(req, res)=>{
    const { productId } = req.params;
   productManager.deleteProduct(productId)

  })
module.exports = router;
