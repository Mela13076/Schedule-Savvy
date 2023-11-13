import { pool } from '../config/database.js'

const getCategories = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM categories ORDER BY category_id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getCategoryById = async (req, res) => {
    try { 
      const categoryId = req.params.categoryId
      const selectQuery = `SELECT * FROM categories WHERE category_id = ${categoryId}`
      const results = await pool.query(selectQuery)
      
      // Gracefully handle non-existent category ID
      if (results.rows[0])
        res.status(200).json(results.rows[0])
      else
        res.status(404).json( { error: `category with ID ${categoryId} not found` } )

    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const createCategory = async (req, res) => {
    try {
      const { title, color_hex } = req.body
      const results = await pool.query(`
        INSERT INTO categories (title, color_hex)
        VALUES($1, $2)
        RETURNING *`,
        [title, color_hex]
      )
      res.status(201).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const updateCategory = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const { title, color_hex } = req.body 
      const results = await pool.query(`
        UPDATE categories SET title = $1, color_hex = $2 WHERE category_id = $3`,
        [title, color_hex, id]
      )
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const deleteCategory = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM categories WHERE category_id = $1', [id])
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
  }


export default {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}