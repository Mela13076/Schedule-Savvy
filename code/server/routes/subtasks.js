import express from 'express'

import SubTaskController from '../controllers/subtasks.js'

const router = express.Router()

router.get('/', SubTaskController.getSubTasks)
router.get('/:subTaskId', SubTaskController.getSubTaskById) 
router.post('/', SubTaskController.createSubTask)
router.patch('/:id', SubTaskController.updateSubTask)
router.delete('/:id', SubTaskController.deleteSubTask)

export default router