const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a product title'],
        maxlength: 32
    },
    description: {
        type: String,
        required: [true, 'Please add a product title'],
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Please add a product price'],
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: [true, 'Please add a product category'],
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)
