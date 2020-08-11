const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        text: true,
        trim: true,
        required: [true, 'Please add a product title'],
        maxlength: 32
    },
    description: {
        type: String,
        required: [true, 'Please add a product description'],
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Please add a product price'],
        maxlength: 32
    },
    averageRating: {
        type: Number,
        default: null,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    category: {
        type: String,
        enum: ['Books', 'Electronics', "Grocery"],
        required: [true, 'Please add a product category'],
    },
    quantity: {
        type: Number
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
},
    { timestamps: true }
)

ProductSchema.index({ '$**': 'text' })

module.exports = mongoose.model("Product", ProductSchema)
