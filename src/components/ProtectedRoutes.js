import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoutes = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const authorizedUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const res = await axios.post(
        "/api/v1/users/getUser",
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data.email);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    }
  };
  useEffect(() => {
    if (!user) {
      authorizedUser();
    }
  });

  return children;
};

export default ProtectedRoutes;
