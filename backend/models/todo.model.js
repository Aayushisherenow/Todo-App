import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;