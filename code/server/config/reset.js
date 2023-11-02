import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const tasksFile = fs.readFileSync(path.join(dirname(currentPath), './data/tasks.json'))
const tasksData = JSON.parse(tasksFile)

const usersFile = fs.readFileSync(path.join(dirname(currentPath), './data/users.json'))
const usersData = JSON.parse(usersFile)

const createTasksTable = async () => {
  const createTasksTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      task_id serial PRIMARY KEY,
      title varchar(128) NOT NULL,
      description varchar(500) NULL,
      due_date date NOT NULL,
      due_time time NOT NULL,
      priority_level varchar(10) NOT NULL,
      completed boolean NOT NULL,
      user_id integer NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    DELETE FROM tasks;
  `
    // const createTasksTableQuery = `
    //   DROP TABLE IF EXISTS tasks;
    // `

  try {
    const res = await pool.query(createTasksTableQuery)
    console.log('🎉 tasks table created successfully')
  }
  catch (err) {
    console.error('⚠️ error creating tasks table', err)
  }
}

const createSubtasksTable = async () => {
    const createSubtasksTableQuery = `
      CREATE TABLE IF NOT EXISTS subtasks (
        subtask_id serial PRIMARY KEY,
        title varchar(128) NOT NULL,
        due_date date NOT NULL,
        due_time time NOT NULL,
        completed boolean NOT NULL,
        task_id integer NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(task_id)
      );
    `
  
    try {
      const res = await pool.query(createSubtasksTableQuery)
      console.log('🎉 subtasks table created successfully')
    }
    catch (err) {
      console.error('⚠️ error creating subtasks table', err)
    }
  }

const createUsersTable = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id serial PRIMARY KEY,
      first_name varchar(128) NOT NULL,
      last_name varchar(128) NOT NULL,
      email varchar(128) NOT NULL
    );
  `

  try {
    const res = await pool.query(createUsersTableQuery)
    console.log('🎉 users table created successfully')
  }
  catch (err) {
    console.error('⚠️ error creating users table', err)
  }
}

const createCategoriesTable = async () => {
    const createCategoriesTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
        category_id serial PRIMARY KEY,
        title varchar(128) NOT NULL,
        color_hex varchar(6) NOT NULL
      );
    `
  
    try {
      const res = await pool.query(createCategoriesTableQuery)
      console.log('🎉 users table created successfully')
    }
    catch (err) {
      console.error('⚠️ error creating users table', err)
    }
}

const createCategoryOfTable = async () => {
    const createCategoryOfTableQuery = `
      CREATE TABLE IF NOT EXISTS categoryof (
        category_id integer NOT NULL,
        task_id integer NOT NULL,
        PRIMARY KEY (category_id, task_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id),
        FOREIGN KEY (task_id) REFERENCES tasks(task_id)
      );
    `
  
    try {
      const res = await pool.query(createCategoryOfTableQuery)
      console.log('🎉 categoryof table created successfully')
    }
    catch (err) {
      console.error('⚠️ error creating categoryof table', err)
    }
}


const seedTasksTable = async () => {
  await createTasksTable()

  tasksData.forEach((task) => {
    const insertQuery = {
      text: 'INSERT INTO tasks (title, description, due_date, due_time, priority_level, completed, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    }
  
    const values = [
      task.title,
      task.description,
      task.due_date,
      task.due_time,
      task.priority_level,
      task.completed,
      task.user_id
    ]

    try {
      pool.query(insertQuery, values)
      console.log(`✅ ${task.title} added successfully`)
    }
    catch (err) {
      console.error('⚠️ error inserting task', err)
    }
  
  })
}

const seedUsersTable = async () => {
    await createUsersTable()
  
    usersData.forEach((user) => {
      const insertQuery = {
        text: 'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)'
      }
    
      const values = [
        user.first_name,
        user.last_name,
        user.email
      ]
  
      try {
        pool.query(insertQuery, values)
        console.log(`✅ ${user.title} added successfully`)
      }
      catch (err) {
        console.error('⚠️ error inserting user', err)
      }
    
    })
  }

// seedTasksTable()
// createTasksTable()
// seedUsersTable()
// createSubtasksTable()
// createCategoriesTable()
// createCategoryOfTable()
