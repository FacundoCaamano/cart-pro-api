import express from 'express'
import { createUser, getUserById, getUsers, isAuthenticated } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/users/:id', getUserById)
router.get('/auth', isAuthenticated)
router.post('/users', createUser)


export default router