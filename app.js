const express = require('express');
const productRouter = require('./src/products.router');
const cartRouter = require('./src/cart.router');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', productRouter);
app.use('/api', cartRouter);

app.listen(8080, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
});
