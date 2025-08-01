import express from 'express';


import { getTodos,createTodo,editTodo,deleteTodo } from '../controller/todo.controller.js';
const router = express.Router();

// router.get('/getAll', verifyToken, getTodos);
// router.post('/add', verifyToken, createTodo);
// router.put('/update/:id', verifyToken, editTodo);
// router.delete('/delete/:id', verifyToken, deleteTodo);

router.get("/getAll",  getTodos);
router.post("/add", createTodo);
router.put("/update/:id", editTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
