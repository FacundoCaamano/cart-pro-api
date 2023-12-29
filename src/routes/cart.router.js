import express from 'express'
import { addProductToCart, getCarts } from '../controllers/cart.controller.js'

const router = express.Router()


router.get('/carts', getCarts )

router.post('/carts/:cartId/product/:productId', addProductToCart)

export default router