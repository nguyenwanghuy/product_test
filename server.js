import express from 'express';
import router from './routes/index.js';
import "dotenv/config";
import { connectToDatabase } from './configs/db.js';
const app =express();
const PORT = 3969;

// Kết nối đến cơ sở dữ liệu
connectToDatabase()

app.use(express.json());

app.use('/api',router)

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})