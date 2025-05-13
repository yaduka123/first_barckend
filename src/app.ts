import express, { Express } from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes'
import taskRouter from './routes/task.route'

// Initialze Express
const app: Express = express ()

// Middleware
app.use (cors())
app.use(express.json())

// Routes
app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)




// Root route
app.get ('/status', (_req, res) => {
    res.send(`
        API is running...
    
    Status: Online
    Uptime: ${Math. floor(process.uptime())} seconds
      Endpoint: 
      -Get /api/users ➡️ fetch all users
      -Get /api/users ➡️ Create a new user
      
      Built with Express + TypeScript + MongoDB
      `)
    })
    export default app