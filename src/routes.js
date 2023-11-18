import React from "react";
// import DefaultLayout from "./components/DefaultLayout";

const Client = React.lazy(() => import("./components/Pages/Client"));
const routes = [
  // { path: "/dashboard", exact: true, name: "Dashboard", element: <DefaultLayout /> },
  { path: "/client", exact: true, name: "Client", element: <Client /> },
  { path: "/invoice", exact: true, name: "Invoice", element: <Client /> },
  { path: "/pending", exact: true, name: "Pending", element: <Client /> },
  { path: "/investment", exact: true, name: "Investment", element: <Client /> },
  { path: "/Expenses", exact: true, name: "Expenses", element: <Client /> },
  { path: "/employee", exact: true, name: "Employee", element: <Client /> },
  { path: "/salary", exact: true, name: "Salary", element: <Client /> },
  { path: "/reports", exact: true, name: "Reports", element: <Client /> },
  {
    path: "/transaction",
    exact: true,
    name: "Transaction",
    element: <Client />,
  },

  // { path: '/login' , name: 'Login', element: Login, exact: true},
  // { path: '/register' , name: 'Register', element: Register, exact: true},
  { path: "*", name: "Not Found", element: <h1>Not Found</h1> },
];

export default routes;
