import { pool } from '../config/database.js'

const getCategoryOfs = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM categoryof ORDER BY category_id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getCategoryOfById = async (req, res) => {
    try { 
      const categoryId = req.params.categoryId
      const taskId = req.params.taskId
      const selectQuery = `SELECT * FROM categoryof WHERE category_id = ${categoryId} AND task_id = ${taskId}`
      const results = await pool.query(selectQuery)
      
      // Gracefully handle non-existent category ID
      if (results.rows[0])
        res.status(200).json(results.rows[0])
      else
        res.status(404).json( { error: `categoryOf with categoryID ${categoryId} and taskId ${taskId} not found` } )

    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const createCategoryOf = async (req, res) => {
    try {
      const { category_id, task_id } = req.body
      const results = await pool.query(`
        INSERT INTO categoryof (category_id, task_id)
        VALUES($1, $2)
        RETURNING *`,
        [category_id, task_id]
      )
      res.status(201).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const deleteCategoryOf = async (req, res) => {
    try {
      const category_id = parseInt(req.params.categoryId)
      const task_id = parseInt(req.params.taskId)
      const results = await pool.query('DELETE FROM categoryof WHERE category_id = $1 AND task_id = $2', [category_id, task_id])
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
  }


export default {
    getCategoryOfs,
    getCategoryOfById,
    createCategoryOf,
    deleteCategoryOf
}