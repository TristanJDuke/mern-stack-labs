import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.route.js';
dotenv.config();

const app = express();
const PORT = 5400;

app.use(cors());

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log('Server running on port 5400')
});