import express from 'express'
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import reviewRouter from './route/reviewRoute.js';

await connectDB() //database called
const PORT  =  process.env.PORT || 8000
const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173",  //connecting with frontend url
    credentials: true
}))

//creating routes
app.use("/api/auth", authRouter)
app.use('/api/user', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/review', reviewRouter)

app.get('/', (req,res)=>{
    res.send("hello from server")
})

app.listen( PORT , ()=>{
    console.log("Express is running...");
    
})