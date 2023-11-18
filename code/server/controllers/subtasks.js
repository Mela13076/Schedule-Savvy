import { pool } from '../config/database.js'

const getSubTasks = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM subtasks ORDER BY subtask_id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getSubTaskById = async (req, res) => {
    try {  
      const subTaskId = req.params.subTaskId
      const selectQuery = `SELECT * FROM subtasks WHERE subtask_id = ${subTaskId}`
      const results = await pool.query(selectQuery)
      
      // Gracefully handle non-existent subtask ID
      if (results.rows[0])
        res.status(200).json(results.rows[0])
      else
        res.status(404).json( { error: `Subtask with ID ${subTaskId} not found` } )

    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const getSubTasksByTaskId = async (req, res) => {
    try { 
      const taskId = req.params.taskId
      const selectQuery = `SELECT * FROM subtasks WHERE task_id = ${taskId}`
      const results = await pool.query(selectQuery)
      
      // Gracefully handle non-existent task ID
      if (results.rows)
        res.status(200).json(results.rows)
      else
        res.status(404).json( { error: `Subtask with task ID ${taskId} not found` } )

    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const createSubTask = async (req, res) => {
    try {
      const { title, due_date, due_time, completed, task_id } = req.body
      const results = await pool.query(`
        INSERT INTO subtasks (title, due_date, due_time, completed, task_id)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
        [title, due_date, due_time, completed, task_id]
      )
      res.status(201).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const updateSubTask = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const { title, due_date, due_time, completed, task_id } = req.body 
      const results = await pool.query(`
        UPDATE subtasks SET title = $1, due_date = $2, due_time = $3, completed = $4, task_id = $5 WHERE subtask_id = $6`,
        [title, due_date, due_time, completed, task_id, id]
      )
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const deleteSubTask = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM subtasks WHERE subtask_id = $1', [id])
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
  }


export default {
    getSubTasks,
    getSubTaskById,
    getSubTasksByTaskId,
    createSubTask,
    updateSubTask,
    deleteSubTask
}