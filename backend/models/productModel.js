const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the product name.'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter the product description.']
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price."],
        maxLength: [8, "Price greater than 1cr."]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'What is the product category?']
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'Number of items in stock?'],
        default: 1,
        maxLength: [4, 'Cannot have more than 10000']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
                maxLength: 500,
                minLength: 50
            }
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);