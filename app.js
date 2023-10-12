const express = require('express');
const productManager = require('./ProductManager');

const app = express();
app.use(express.urlencoded({ extended: true }));


app.get('/products', (req, res) => {
  const { query } = req;
  const { limit } = query;
  if (!limit) {
    res.json(productManager.getProducts());
  } else {
    const result = productManager.getProducts().filter((product) => product.id <= parseInt(limit));
    res.json(result);
  }
});
app.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  const product = productManager.getProductById(productId);

  if (!product) {
    res.json({ error: 'Product not found.' });
  } else {
    res.json(product);
  }
});



app.listen(8080, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
  });