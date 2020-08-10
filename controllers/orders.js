
const asyncHandler = require('../middleware/async')
const sendEmail = require('../utils/sendEmail')
const { Order } = require('../models/Order')
const User = require('../models/User')

// @desc      Get all orders
// @route     GET /api/v1/orders
// @access    Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
    console.log("hello get orders here")
    const orders = await Order.find({})
        .populate({
            path: 'products.product',
            select: 'title description'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        data: orders
    })
})

// @desc      Get order by id
// @route     GET /api/v1/orders/:id
// @access    Private/Admin
exports.getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate({
            path: 'products.product',
            select: 'title description'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        data: order
    })
})

// @desc      Create order
// @route     POST /api/v1/orders
// @access    Private/Admin
exports.createOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.create(req.body)
    console.log(order)

    const user = await User.findById(order.user)

    const html = `
    You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n
    <p>Customer name:</p>
    <p>Total products: ${order.products.length}</p>
    <p>Total cost: ${order.amount}</p>
    <p>Login to dashboard to the order in detail.</p>
    `

    await sendEmail({
        email: user.email,
        subject: 'Order Created',
        html
    })

    res.status(201).json({
        success: true,
        data: order
    })
})


// @desc      Update order
// @route     PUT /api/v1/orders/:id
// @access    Private/Admin
exports.cancelOrder = asyncHandler(async (req, res, next) => {
    console.log("hello get orders here")
    const orders = await Order.findByIdAndUpdate(req.params.id,
        { status: 'Cancelled' },
        {
            new: true,
            runValidators: true
        })

    res.status(200).json({
        success: true,
        data: orders
    })
})