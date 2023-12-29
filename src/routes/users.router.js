import express from 'express'
import { createUser, getUserById, getUsers } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)


export default router