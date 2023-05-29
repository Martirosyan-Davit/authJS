import express from 'express'
import dotenv from 'dotenv'
import poll from './db.js';
import UserRouter from './router/routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

const start = async  () => {
    try{
         await poll.connect()
       app.listen(PORT, () => console.log(`Server started on PORT:  ${PORT}`));
    } catch(e) {
        console.log(e);
    }

}

start();
app.use('/api',UserRouter)
