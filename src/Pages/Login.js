import React, { useContext, useState } from "react";
import passwordKeyIcon from "../assets/icons/passwordKey.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const login = async (e) => {
    try {
      e.preventDefault();
      // spellgrowth
      // !sraR_Sp3lL_Fa!sa1
      const data = {
        email,
        password,
      };
      const res = await axios.post("/api/v1/users/login", data);
      if (res.data.success) {
        localStorage.setItem("token", res.data.data);
        setUser(email);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };
  return (
    <>
      <div className="bg-yellow-400 h-screen w-screen flex">
        <div className="left_part hidden md:flex md:w-3/5"></div>
        <div className="right_part bg-yellow-400 md:bg-white w-full rounded-none md:rounded-l-3xl flex items-center justify-center flex-col">
          <p className="text-3xl font-semibold">Login</p>
          <form className="mt-10 w-80" onSubmit={login} autoComplete="off">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                <svg
                  className="w-4 h-4 text-black dark:text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                id="email"
                className="rounded-none rounded-r-lg  border text-gray-900 focus:ring-yellow-400 focus:border-yellow-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex mt-3">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md grayscale">
                <img
                  src={passwordKeyIcon}
                  alt="passwordKeyIcon"
                  className="w-4 h-4"
                />
              </span>
              <input
                type="password"
                id="pasword"
                className="rounded-none rounded-r-lg  border text-gray-900 focus:ring-yellow-400 focus:border-yellow-400 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="md:bg-yellow-400 md:text-black bg-black text-white px-3 py-1 rounded-md mt-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
