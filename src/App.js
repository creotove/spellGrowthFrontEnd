import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Suspense } from "react";
import DefaultLayout from "./Layout/DefaultLayout";
import { Navigate } from "react-router-dom";
import Client from "./Pages/Client";
import Invoice from "./Pages/Invoice";
import Pending from "./Pages/Pending";
import Expense from "./Pages/Expense";
import Employee from "./Pages/Employee.js";
import Salary from "./Pages/Salary";
import Reports from "./Pages/Reports";
import Transaction from "./Pages/Transaction";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login.js";
import AllotWork from "./Pages/AllotWork.js";
import PreviewInvoice from "./Pages/PreviewInvoice.js";
import Investment from "./Pages/Investment.js";
import Income from "./Pages/Income.js";
import Logout from "./Pages/Logout.js";

function App() {
  return (
    <div className="dashboard flex">
      <Router>
        
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Dashboard />} />{" "}
                {/* The index route for the Dashboard */}
                <Route path="/client" element={<Client />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="/income" element={<Income />} />
                <Route path="/investment" element={<Investment />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/employee/allotWork" element={<AllotWork />} />
                <Route path="/salary" element={<Salary />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/transactions" element={<Transaction />} />
              </Route>
              <Route path="/invoice/preview" element={<PreviewInvoice />} />
              <Route path="login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;
