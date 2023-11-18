import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import InvoiceContext from "../context/InvoiceContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setInvoice } = useContext(InvoiceContext);
  navigate("/login");
  localStorage.removeItem("token");
  setUser(null);
  setInvoice(null);
};

export default Logout;
