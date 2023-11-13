import express from 'express'

import CategoryOfController from '../controllers/categoryof.js'

const router = express.Router()

router.get('/', CategoryOfController.getCategoryOfs)
router.get('/:categoryId/:taskId', CategoryOfController.getCategoryOfById) 
router.post('/', CategoryOfController.createCategoryOf)
router.delete('/:categoryId/:taskId', CategoryOfController.deleteCategoryOf)

export default router