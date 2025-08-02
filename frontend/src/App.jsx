import { useState, useEffect } from "react";
import "./App.css";
import { axiosInstance } from "./utils/axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    fetchTodos();
  }, [editId]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("todos/getAll");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;

    try {
      const response = await axiosInstance.post("todos/add", {
        title,
        description,
        completed: false,
      });
      setTodos((prev) => [...prev, response.data.data]);
      e.target.reset();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const onEdit = (id) => {
    const todo = todos.find((t) => t._id === id);
    setEditId(id);
    setEditValues({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    });
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `todos/update/${editId}`,
        editValues
      );
     
      setTodos((prev) =>
        prev.map((todo) => (todo._id === editId ? response.data.data : todo))
      );
      setEditId(null);
      setEditValues({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axiosInstance.delete(`todos/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-purple-300 min-h-screen">
        <div className="bg-gray-700 w-full">
          <h1 className="text-4xl font-bold text-center text-white p-4">
            Todo app
          </h1>
        </div>

        <div className="bg-gray-200 mx-10 mt-10 p-6 rounded">
          <form
            onSubmit={addTodo}
            className="flex flex-row items-center gap-8 p-4"
          >
            <input
              type="text"
              placeholder="Title"
              className="p-4 border rounded w-1/5"
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="p-4 border rounded w-1/5"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded w-1/6"
            >
              Add
            </button>
          </form>

          <div className="todo-list p-4">
            {todos.map((todo) => (
              
              <div
                key={todo._id}
                className="todo-item bg-white p-4 mb-4 rounded shadow"
              >
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
                <p className="text-gray-500">
                  {todo.completed ? "Completed" : "Pending"}
                </p>

                <div className="flex space-between mt-4">
                  <button
                    className="bg-blue-500 text-white p-2 rounded m-2 w-1/6"
                    onClick={() => onEdit(todo._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded m-2 w-1/6"
                    onClick={() => onDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>

                {editId === todo._id && (
                  <form
                    onSubmit={updateTodo}
                    className="mt-4 flex flex-col gap-2 bg-gray-100 p-4 rounded"
                  >
                    <input
                      type="text"
                      value={editValues.title}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          title: e.target.value,
                        })
                      }
                      placeholder="Updated Title"
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          description: e.target.value,
                        })
                      }
                      placeholder="Updated Description"
                      className="p-2 border rounded"
                      required
                    />

                    <div className="flex gap-4 items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`status-${todo._id}`}
                          checked={editValues.completed}
                          onChange={() =>
                            setEditValues({
                              ...editValues,
                              completed: true,
                            })
                          }
                        />
                        Completed
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`status-${todo._id}`}
                          checked={!editValues.completed}
                          onChange={() =>
                            setEditValues({
                              ...editValues,
                              completed: false,
                            })
                          }
                        />
                        Pending
                      </label>
                    </div>

                    <div className="flex gap-4 mt-2">
                      <button
                        type="submit"
                        className="bg-green-600 text-white p-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditId(null)}
                        className="bg-gray-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
