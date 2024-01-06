import express from 'express'
import { createUser, editUser, getUserById, getUsers, isAuthenticated } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/edituser/:id', editUser)
router.post('/auth', isAuthenticated)
router.post('/users', createUser)


export default router