import express from 'express'
import { createUser, editUser, getUserById, getUsers, isAuthenticated } from '../controllers/user.controller.js'
import { checkToken } from '../../utils.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/edituser/:id',checkToken ,editUser)
router.post('/auth', isAuthenticated)
router.post('/users', createUser)


export default router