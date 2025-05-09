import express, { Application } from "express";
import "./Database/db_connect";
const app: Application = express()
app.use(express.json());
import userRoute from './routes/userRoute'
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'

//for route
app.use('/api/auth',userRoute); //localhost:3000/api/auth/register
app.use('/api',categoryRoute); //localhost:3000/api/
app.use('/api/product',productRoute); //localhost:3000/api/product










export default app;