import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config();

 mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error("Error", err);
})

const app = express();

app.use('/api/user', userRouter);
 
app.listen(4001, () => {
    console.log('Server running on port 4001')
})

