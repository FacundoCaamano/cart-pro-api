import express from 'express'
import { addAddress, createUser,deleteAddress, editUser, getUserById, isAuthenticated } from '../controllers/user.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()


router.get('/users/:id', getUserById)
router.post('/users/address/:userId', addAddress)
router.put('/users/edituser/:id',checkToken ,editUser)
router.post('/auth', isAuthenticated)
router.post('/users', createUser)
router.delete('/users/address/:userid/:addressId', deleteAddress)

    
export default router