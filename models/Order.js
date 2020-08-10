const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true
        },
        price: {
            type: Number,
            trim: true,
            required: [true, 'Please add the product price'],
            maxlength: 32
        },
        quantity: {
            type: Number
        },
    }
)

const CartItem = mongoose.model("CartItem", CartItemSchema)

const OrderSchema = new mongoose.Schema(
    {
        products: [CartItemSchema],
        transaction_id: {
            type: String,
            unique: true
        },
        amount: { type: Number },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        status: {
            type: String,
            default: "Not processed",
            enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
        },
        updated: Date,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", OrderSchema)


module.exports = { Order, CartItem }
