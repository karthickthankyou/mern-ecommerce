const Product = require('../models/product')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')


// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
    const product = await Product.find({})

    res.status(200).json({
        success: true,
        data: product
    })
})

// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    res.status(200).json({
        success: true,
        data: product
    })
})


// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        data: product
    })
})

// @desc      Update product
// @route     PUT /api/v1/products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(
            new ErrorResponse(`Product not found with ID ${req.params.id}`, 404)
        )
    }

    // TODO: Make sure the requester is authorized.

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(201).json({
        success: true,
        data: product
    })
})

// @desc      Delete product
// @route     DELETE /api/v1/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(
            new ErrorResponse(`Product not found with ID ${req.params.id}`, 404)
        )
    }

    // TODO: Make sure the requester is authorized.

    await product.remove()

    res.status(201).json({
        success: true,
        data: {}
    })
})


// @desc      Search products
// @route     GET /api/v1/products/search/:keyword
// @access    Public
exports.searchProducts = asyncHandler(async (req, res, next) => {
    // TODO: include fuzzy search and autocomplete
    const products = await Product.aggregate([{ $search: { 'text': { 'query': req.params.keyword, 'path': 'title' } } }])

    res.status(200).json({
        success: true,
        data: products
    })
})