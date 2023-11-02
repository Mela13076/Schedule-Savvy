import { pool } from '../config/database.js'

const getTasks = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM tasks ORDER BY task_id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getTaskById = async (req, res) => {
    try { 
      const taskId = req.params.taskId
      const selectQuery = `SELECT * FROM tasks WHERE task_id = ${taskId}`
      const results = await pool.query(selectQuery)
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const createTask = async (req, res) => {
    try {
      const { title, description, due_date, due_time, priority_level, completed, user_id } = req.body
      const results = await pool.query(`
        INSERT INTO tasks (title, description, due_date, due_time, priority_level, completed, user_id)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [title, description, due_date, due_time, priority_level, completed, user_id]
      )
      res.status(201).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const updateTask = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const { title, description, due_date, due_time, priority_level, completed, user_id } = req.body 
      const results = await pool.query(`
        UPDATE tasks SET title = $1, description = $2, due_date = $3, due_time = $4, piority_level = $5, completed = $6, user_id = $7 WHERE task_id = $8`,
        [title, description, due_date, due_time, priority_level, completed, user_id, id]
      )
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const deleteTask = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM tasks WHERE task_id = $1', [id])
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
  }


export default {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}