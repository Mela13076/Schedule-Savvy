import express from 'express'

import CategoryController from '../controllers/categories.js'

const router = express.Router()

router.get('/', CategoryController.getCategories)
router.get('/:categoryId', CategoryController.getCategoryById) 
router.post('/', CategoryController.createCategory)
router.patch('/:id', CategoryController.updateCategory)
router.delete('/:id', CategoryController.deleteCategory)

export default router