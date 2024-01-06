import express from 'express'
import { createBuy, getBuys } from '../controllers/buys.controller.js'

const router = express.Router()

router.get('/buys/:userId', getBuys)
router.post('/buys/createbuy', createBuy)
export default router
