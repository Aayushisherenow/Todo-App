import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthPage } from "./pages/loginpage";
import Homepage from "./pages/homepage";
import { UserProvider } from "./context/userContext"; 


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  </StrictMode>
);
