import express from "express";
import cors from 'cors'
import { config } from "dotenv";
import { errormiddleware } from "./middleware/error.js";
import routes from './routes/route.js'


const app = express();
config({path:'./.env'})
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET" , "POST"],
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/bfhl' , routes)


app.use(errormiddleware);
export default app;