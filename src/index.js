import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextProvider from "./context/UserContextProvider";
import InvoiceContextProvider from "./context/InvoiceContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <UserContextProvider>
      <InvoiceContextProvider>
        <App />
      </InvoiceContextProvider>
    </UserContextProvider>
  // </React.StrictMode>
);
