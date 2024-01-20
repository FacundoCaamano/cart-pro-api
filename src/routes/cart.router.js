import express from 'express'
import { addProductToCart, getCartById, getCarts } from '../controllers/cart.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()


router.get('/carts',getCarts )

router.get('/carts/:id', getCartById)

router.post('/carts/:cartId/product/:productId', addProductToCart)

export default router