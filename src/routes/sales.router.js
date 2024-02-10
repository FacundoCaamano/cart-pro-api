import  express  from 'express'
import { createSales, getSalesById } from '../controllers/sales.controller.js'



const router = express.Router()

router.get('/sales', getSalesById)
router.post('/create-sale', createSales)
export default router