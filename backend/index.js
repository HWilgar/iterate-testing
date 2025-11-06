import express from 'express';
import dotenv from 'dotenv';
import iterateRoutes from './routes/iterate.routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const baseURL = '/api/v1';
const corsOptions = {
  origin: "https://infor.stg.tovuti.io",
  credential: true,
  methods: ["GET", "HEAD", "PUT" ,"PATCH", "POST", "DELETE"],
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};


// Middleware
app.use(cors(corsOptions));
app.options("/", cors(corsOptions));
app.use(express.json());

app.use(`${baseURL}/data`, iterateRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});