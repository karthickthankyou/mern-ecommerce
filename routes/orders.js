const express = require("express")
const router = express.Router()

const {
    getOrders,
    getOrderById,
    createOrder,
    cancelOrder

} = require("../controllers/orders")

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.put('/:id', cancelOrder)
// router.put('/:id', updateProduct)
// router.delete('/:id', deleteProduct)
// router.get('/search/:keyword', searchProducts)

module.exports = router
