import  Todo  from "../models/todo.model.js";
// import jwt from "jsonwebtoken";


const createTodo = async (req, res) => { 

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }


    try {
        const newTodo = await Todo.create({
            title,
            description,
            author: req.user._id
        });

        return res.status(201).json({ message: "Todo created successfully", data: newTodo });
    } catch (error) {
        return res.status(500).json({ message: "Error creating todo", error: error.message });
    }
}



const editTodo = async (req, res) => {

    const { id } = req.params;
    const { title, description, completed } = req.body;
    

if (
  title === undefined &&
  description === undefined &&
  completed === undefined
) {
  return res
    .status(400)
    .json({ message: "Title, description, or completed status are required" });
}


    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.title = title !== undefined ? title : todo.title;
        todo.description = description !== undefined ? description : todo.description;
        todo.completed = completed !== undefined ? completed : todo.completed;

        const updatedTodo = await todo.save();

        if (!updatedTodo) {
            return res.status(500).json({ message: "Error updating todo" });
        }

        return res.status(200).json({ message: "Todo updated successfully", data: updatedTodo });
    } catch (error) {
        return res.status(500).json({ message: "Error updating todo", error: error.message });
    }
}


const deleteTodo = async (req, res) => {

    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({ message: "Todo deleted successfully", data: todo });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
};



const getTodos = async (req, res) => { 

    try {
            const userId = req.user._id;
 if (!userId) {
   return res.status(401).json({ message: "Unauthorized: User ID not found" });
 }
        const todos = await Todo.find({ author: userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "Todos fetched successfully", data: todos });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching todos", error: error.message });
    }
}

export { createTodo, editTodo, deleteTodo, getTodos };