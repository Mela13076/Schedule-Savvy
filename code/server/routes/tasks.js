import express from 'express'

import TaskController from '../controllers/tasks.js'

const router = express.Router()

router.get('/', TaskController.getTasks)
router.get('/:taskId', TaskController.getTaskById) 
router.post('/', TaskController.createTask)
router.patch('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

export default router