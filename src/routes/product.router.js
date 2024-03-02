import express from 'express'
import { createProduct, deleteProduct, editProduct, getProductById, getProducts, getPublishedProducts } from '../controllers/product.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id',getProductById)
router.get('/products/my-products/:userId', checkToken,getPublishedProducts)
router.put('/products/edit-my-products/:productId', checkToken,editProduct)
router.post('/products', checkToken,createProduct)
router.delete('/products/delete-product/:productId',checkToken ,deleteProduct)
export default router