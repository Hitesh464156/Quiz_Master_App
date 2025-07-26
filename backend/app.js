import express from 'express';
import cors from 'cors';
import connect from './db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT ||3000;
const db_url = process.env.DB_URL;
const frontend_url = process.env.FRONTEND_URL ;

connect(db_url);
const allowedOrigins = ["https://quiz-master-app-21.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/quiz', quizRoutes);

// --------------------Deployment-------------------------
// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname1,'../frontend/dist')))
//     app.get('*',(req, res)=>{
//         res.sendFile(path.resolve(__dirname1, '../frontend', 'dist', 'index.html'))
//     });
// }
// else{
//     app.get('*',(req, res)=>{
//         res.send("API is running successfully.")
//     });
// }
// --------------------Deployment-------------------------
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



