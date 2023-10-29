// require('dotenv').config();

import express from 'express';
import path from 'path';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import uploadRouter from './routes/uploadRouter.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to Database')
}).catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// favicon.ico


app.use('/api/upload', uploadRouter)
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
);

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})