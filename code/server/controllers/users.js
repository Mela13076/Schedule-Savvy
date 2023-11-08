import { pool } from '../config/database.js'

const getUsers = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM users ORDER BY user_id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getUserById = async (req, res) => {
    try { 
      const userId = req.params.userId
      const selectQuery = `SELECT * FROM users WHERE user_id = ${userId}`
      const results = await pool.query(selectQuery)
      
      // Gracefully handle non-existent user ID
      if (results.rows[0])
        res.status(200).json(results.rows[0])
      else
        res.status(404).json( { error: `user with ID ${userId} not found` } )

    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const createUser = async (req, res) => {
    try {
      const { first_name, last_name, email } = req.body
      const results = await pool.query(`
        INSERT INTO users (first_name, last_name, email)
        VALUES($1, $2, $3)
        RETURNING *`,
        [first_name, last_name, email]
      )
      res.status(201).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const updateUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const { first_name, last_name, email } = req.body 
      const results = await pool.query(`
        UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4`,
        [first_name, last_name, email, id]
      )
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const deleteUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM users WHERE user_id = $1', [id])
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
  }


export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}