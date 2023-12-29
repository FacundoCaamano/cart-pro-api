import express from 'express'
import { createProduct, getProducts } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/products', getProducts)
router.post('/products', createProduct)

export default router