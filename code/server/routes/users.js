import express from 'express'

import UserController from '../controllers/users.js'

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:userId', UserController.getUserById) 
router.post('/', UserController.createUser)
router.patch('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router