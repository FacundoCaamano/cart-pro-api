import express from 'express'
import { createProduct, deleteProduct, editProduct, getProductById, getProducts, getPublishedProducts } from '../controllers/product.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id',getProductById)
router.get('/products/my-products/:userId', getPublishedProducts)
router.put('/products/edit-my-products/:productId', editProduct)
router.post('/products', createProduct)
router.delete('/products/delete-product/:productId', deleteProduct)
export default router