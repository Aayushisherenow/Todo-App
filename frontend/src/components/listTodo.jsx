import { useUserContext } from "../context/userContext.jsx"; // ✅
const ListTodo = ({
  todos,
  setTodos,
  editId,
  setEditId,
  editValues,
  setEditValues,
}) => {
  const { authAxios } = useUserContext(); 

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
      console.log("Sending update:", editValues);

      const response = await authAxios.put(
        `todos/update/${editId}`,
        editValues
      );
      console.log("update response", response);
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
      await authAxios.delete(`todos/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
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
                      checked={editValues.completed === true}
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
                      checked={editValues.completed === false}
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
        <h2 className="text-center text-gray-500">
          {todos.length === 0 ? "No todos available" : ""}
        </h2>
      </div>
    </>
  );
};

export default ListTodo;
