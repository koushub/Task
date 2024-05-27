import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/signin");
  };

  return signOut;
};