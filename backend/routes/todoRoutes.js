import express from 'express';

import { getTodos,createTodo,editTodo,deleteTodo } from '../controller/todo.controller.js';
import authenticate from '../middleware/auth.js';
const router = express.Router();



router.get("/getAll", authenticate, getTodos);
router.post("/add", authenticate, createTodo);
router.put("/update/:id", authenticate, editTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

export default router;
