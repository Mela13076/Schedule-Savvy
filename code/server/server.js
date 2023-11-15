import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/tasks.js'
import userRoutes from './routes/users.js'
import subtaskRoutes from './routes/subtasks.js'
import categoryRoutes from './routes/categories.js'
import categoryOfRoutes from './routes/categoryof.js'

const app = express()

const CLIENT_URL = process.env.NODE_ENV === 'production' ? 'https://client-production-564a.up.railway.app' : 'http://localhost:5173'

app.use(express.json())
app.use(cors({
  origin: CLIENT_URL,
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}))

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;"> Schedule Savvy API <h1>')
})

app.get('/', (req, res) => {
    res.redirect(CLIENT_URL)
  })

app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/subtasks', subtaskRoutes)
app.use('/categories', categoryRoutes)
app.use('/categoryof', categoryOfRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})