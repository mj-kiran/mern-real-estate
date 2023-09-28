import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoute.js'
import dotenv from 'dotenv'

dotenv.config();

 mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error("Error", err);
})

const app = express();

app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/auth',authRouter)
 
app.listen(4001, () => {
    console.log('Server running on port 4001')
})

