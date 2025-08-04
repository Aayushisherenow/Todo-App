import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout, token, user } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-gray-700 min-w-[300px] m-4 rounded-lg shadow-lg flex justify-between items-center px-6 py-4">
      <h1 className="text-3xl font-bold text-white">Todo App</h1>

      {token && user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export { Header };
