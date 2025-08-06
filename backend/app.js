import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = [
  "http://localhost:4444",
  "https://todo-6u17zwdoz-aayush-poudels-projects-471383aa.vercel.app",
  "https://todo-app-pi-coral.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);






import todoRoutes from './routes/todoRoutes.js';
app.use('/api/todos', todoRoutes);

import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

export default app;
