import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: [`http://localhost:${process.env.LISTEN_PORT || 4444}`,
      "https://todo-6u17zwdoz-aayush-poudels-projects-471383aa.vercel.app",
      "https://todo-app-pi-coral.vercel.app"
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
  


import todoRoutes from './routes/todoRoutes.js';
app.use('/api/todos', todoRoutes);

import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

export default app;
