import { useUserContext } from "../context/userContext";

const InputTodo = ({ todos, setTodos }) => {
  const { authAxios } = useUserContext(); 
  const addTodo = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;

    try {
      const response = await authAxios.post("todos/add", {
        title,
        description,
        completed: false,
      });
      setTodos([...todos, response.data.data]);
      console.log("Todo added:", response.data.data);
      e.target.reset();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  return (
    <>
      <form onSubmit={addTodo} className="flex flex-row items-center gap-8 p-4">
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
    </>
  );
};

export { InputTodo };
