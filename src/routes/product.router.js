import express from 'express'
import { createProduct, getProducts } from '../controllers/product.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()

router.get('/products', getProducts)
router.post('/products', createProduct)

export default router