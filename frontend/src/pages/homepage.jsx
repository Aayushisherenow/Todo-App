import { Header } from "../components/header";
import { InputTodo } from "../components/inputTodo";
import ListTodo from "../components/listTodo";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { token, authAxios } = useUserContext();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    completed: false,
  });

   useEffect(() => {
     if (!token) {
       navigate("/login", { replace: true });
     }
   }, [token]);


  useEffect(() => {
    if (!token) return;
    fetchTodos();
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await authAxios.get("todos/getAll");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    };
    console.log("Todos fetched:", todos);
  

  return (
    <div className="container mx-auto p-4 bg-gray-300 min-h-screen">
      <Header />
      <InputTodo todos={todos} setTodos={setTodos} />
      <ListTodo
        todos={todos}
        setTodos={setTodos}
        editId={editId}
        setEditId={setEditId}
        editValues={editValues}
        setEditValues={setEditValues}
      />
    </div>
  );
};

export default Homepage;
