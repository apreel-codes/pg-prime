import express from 'express';
import Product from '../models/Product.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();


productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const newProduct = new Product({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price,
        size: req.body.size,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        rating: 0,
        numReviews: 0,
      });
      const product = await newProduct.save();
      res.send({ message: 'Product Created', product });
    })
  );



  productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.slug = req.body.slug;
        product.price = req.body.price;
        product.size = req.body.size,
        product.image = req.body.image;
        product.images = req.body.images;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        await product.save();
        res.send({ message: 'Product Updated' });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );



  productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.deleteOne();
        res.send({ message: 'Product Deleted' });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
  }
})
  );

  productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        if (product.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: 'You already submitted a review' });
        }
  
        const review = {
          name: req.user.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
          message: 'Review Created',
          review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
          numReviews: product.numReviews,
          rating: product.rating,
        });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );


const PAGE_SIZE = 10;

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

const SEARCH_PAGE_SIZE = 10;

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || SEARCH_PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const brandFilter = brand && brand !== 'all' ? { brand } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);


productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    })
);

productRouter.get('/allProducts', expressAsyncHandler(async (req, res) => {
  const allProducts = await Product.find();
  res.send(allProducts);
})
);

productRouter.get('/brands', expressAsyncHandler(async (req, res) => {
    const brands = await Product.find().distinct('brand');
    res.send(brands);
})
);

productRouter.get('/sizes', expressAsyncHandler(async (req, res) => {
  const sizes = await Product.find().distinct('size');
  res.send(sizes);
})
);

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug:req.params.slug });
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
});

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
});


export default productRouter;