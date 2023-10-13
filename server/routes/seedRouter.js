import express from 'express';
import Product from '../models/Product.js';
import data from '../data.js';
import User from '../models/User.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.deleteMany({}); //remove all products in all Product model
    const createdProducts = await Product.insertMany(data.products); //to add products present in the data.js into our newly created Product model
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts, createdUsers });
});

export default seedRouter;