import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoute.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

 mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error("Error", err);
})

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal Server error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
 
app.listen(4001, () => {
    console.log('Server running on port 4001')
})

