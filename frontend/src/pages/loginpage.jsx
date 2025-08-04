import { useState } from "react";
import { Header } from "../components/header";
import Login from "../components/login";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Header />
      <Login isLogin={isLogin} setIsLogin={setIsLogin} />
    </>
  );
};

export { AuthPage };
