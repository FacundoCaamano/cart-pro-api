import express from 'express'
import { createProduct, getProductById, getProducts } from '../controllers/product.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id',getProductById)
router.post('/products', createProduct)

export default router