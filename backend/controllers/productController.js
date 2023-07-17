const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

// admin-route : create a new product
const createProduct = async (req, res, next) => {
    try {
        req.body.author = req.user._id;
        const product = await Product.create(req.body);
        res.status(201).json({
            product,
            success: true
        }); 
        
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// get all the products
const getAllProducts = async (req, res, next) => {
    try {
        const resultPerPage = 8;
        const productCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query);
        let products = await apiFeature.search().filter().pagination(resultPerPage).query; 

        res.status(200).json({
            products: [
                ...products
            ]
            ,
            success: true,
            productCount: productCount,
            resultPerPage: resultPerPage
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// get all the products --admin
const getAllProductsAdmin = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            products: products,
            success: true
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// admin-route : update product
const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 500));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// admin-route : delete product
const deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler('Product not found!', 500));
        }

        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// get the product details
const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 500));
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// add review to a product
const createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body;
        const review = {
            name: req.user.name,
            user: req.user._id,
            comment: comment,
            rating: Number(rating)
        };

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler('Product not found', 400));
        }

        const reviewIndex = product.reviews.findIndex((r) => r.user.toString() === review.user.toString());

        if (reviewIndex !== -1) {
            product.reviews[reviewIndex] = review;
        } else {
            product.reviews.push(review);
        }

        product.numberOfReviews = product.reviews.length;
        let totalRating = 0;
        product.reviews.forEach((review) => {
            totalRating += review.rating;
        })
        product.rating = totalRating / product.numberOfReviews;

        await product.save({ validateBeforeSave: false });

        res.status(200).send({
            success: true,
            product
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// get all reviews of a product
const getProductReviews = async (req, res, next) => {
    const productId = req.query.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 400));
        }
        res.status(200).json({
            success: true,
            reviews: product.reviews
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// delete a product review
const deleteProductReview = async (req, res, next) => {
    try {
        const productId = req.query.productId;
        const reviewId = req.query.reviewId;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler('Product not found!', 400));
        }

        const reviews = product.reviews.filter(review => review._id.toString() !== reviewId.toString());

        let totalRating = 0;
        const numberOfReviews = reviews.length;

        reviews.forEach((review) => {
            totalRating += review.rating;
        });

        let rating = 0;

        if (numberOfReviews !== 0) {
            rating = totalRating / numberOfReviews;
        }

        const newProduct = await Product.findByIdAndUpdate(productId, {
            reviews,
            numberOfReviews,
            rating
        },
        {
            new: true,
            runValidators: true
        });

        res.status(200).send({
            success: true,
            newProduct
        });

    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

module.exports = { getAllProductsAdmin, getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview };