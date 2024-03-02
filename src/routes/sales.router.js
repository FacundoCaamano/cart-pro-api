import  express  from 'express'
import { createSales, getSalesById } from '../controllers/sales.controller.js'
import { checkToken } from '../../utils.js'



const router = express.Router()

router.get('/sales/:_id',checkToken, getSalesById)
router.post('/create-sale', checkToken,createSales)
export default router