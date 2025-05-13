import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const port = process.env.PORT || 5000

// Start the Server
app.listen(port, () => {
    console.log(` server running on port ${port}`)
})