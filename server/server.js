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
import expressAsyncHandler from "express-async-handler"
import request from 'request';
import User from './models/User.js';



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

app.post(
    '/subscribe',
    expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    // validation
    if(!email){
        res.status(401).send({ message: 'Kindly provide an email address' });
    }
    //construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed'
            }
        ]
    }

    const postData = JSON.stringify(data);

    const options = {
        url: 'https://us21.api.mailchimp.com/3.0/lists/6499f4b028',
        method: 'POST',
        headers: {
            Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`
        },
        body: postData
    };

  request(options, (err, response, body) => {
        if(err){
            res.status(401).send({ message: 'An error occured' });
        } else {
            if(response.statusCode === 200 ) {
                res.status(200).send({ message: 'You have successfully subscribed to our newsletter' });
            } else {
                res.status(401).send({ message: 'An error occured' });
            }
        }

    });
    })
  )
  

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


// curl https://abokifx.com/api/v1/rates/movement 
// -H 
// "Accept: application/json" 
// "Authorization: Bearer {YOUR_AUTH_TOKEN}"
