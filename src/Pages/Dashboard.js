import React, { memo, useEffect, useState } from "react";
import BoxTopBar from "../components/BoxTopBar";
import "./Dashboard.css";
import DashbordSmallBox from "../components/DashbordSmallBox";
import LatestPayment from "../components/LatestPayment";
import LatestClients from "../components/LatestClients";
import axios from "axios";

const Dashboard = memo(() => {
  const [currentAmount, setCurrentAmount] = useState(0); // Initially, there is no data
  const [latestTransactionAmount, setLatestTransactionAmount] = useState(0); // Initially, there is no data
  const [latestTransactionType, setLatestTransactionType] = useState(""); // Initially, there is no data

  const [transactions, setTransactions] = useState([]); // Initially, there is no data
  const [percentages, setPercentages] = useState([]); // Initially, there is no data
  const getCurrentAmount = async () => {
    try {
      const res = await axios.get(`/api/v1/users/currentAmount`);
      if (res.data.success) {
        setCurrentAmount(res.data.data.remainingBalance);
        setLatestTransactionAmount(res.data.data.amount);
        setLatestTransactionType(res.data.data.type);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTransaction = async () => {
    try {
      const res = await axios.get(`/api/v1/users/getTransactionForBoxes`);
      if (res.data.success) {
        setTransactions(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPercentageChanges = async () => {
    try {
      const res = await axios.post('/api/v1/users/compareAndUpdate');
      if (res.data.success) {
        setPercentages(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCurrentAmount();
    getTransaction();
    getPercentageChanges();
  }, []);
  return (
    <main className="ms-5 mt-12">
      <div className="flex me-5 flex-col md:flex-row h-80 sm:h-64 flex-1">
        <div className="total_balance w-full md:w-6/12 h-full rounded-2xl bg-white me-9 overflow-hidden mb-3 md:mb-0">
          <div className="container flex justify-between items-center h-full flex-col sm:flex-row md:flex-col lg:flex-row">
            <div className="left_part mt-6 ms-6 d-flex justify-center">
              <span
                className="text-4xl font-semibold"
                style={{
                  fontWeight: "600",
                }}
              >
                {
                  <p
                    className={`text-${
                      latestTransactionType === "Expense" ? "red" : "green"
                    }-500 text-center font-extrabold text-2xl`}
                  >
                    {latestTransactionType === "Expense" ? "- ₹" : "+ ₹"}
                    {latestTransactionAmount}{" "}
                  </p>
                }
                {latestTransactionType === "Expense"
                  ? "Expense"
                  : latestTransactionType === "Investment"
                  ? "Invested"
                  : "Income"}
              </span>
              <p className="text-zinc-400 text-center">Last Transaction</p>
            </div>
            <div className="right_part text-white flex">
              <div className="relative circle_wrapper">
                <span className="circle_black absolute h-80 w-80 hidden md:inline-block rounded-full bg-black lg:h-80 lg:w-80 -right-2/3 -top-8 sm:-top-24 sm:-left-16 md:-top-16 md:right-0 lg:right-8 lg:-top-24"></span>
                <div className="amt_values relative me-6">
                  <p
                    className="text-2xl bg-black px-2 py-3 rounded-md md:bg-transparent md:px-0 md:py-0 md:rounded-none sm:text-3xl md:text-2xl lg:text-3xl"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentAmount < 0 ? "- ₹" : "+ ₹"}
                    {Math.abs(currentAmount)}
                  </p>
                  <p className="text-black md:text-white">Total Amount</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="report rounded-2xl w-full md:w-6/12 bg-white">
          <BoxTopBar
            heading="Report"
            optionList={[
              { name: "option1", link: "#" },
              { name: "option2", link: "#" },
              { name: "option3", link: "#" },
            ]}
          />
        </div>
      </div>
      {/* second row */}
      <div className="flex flex-wrap items-center w-full mt-6 gap-6">
        {transactions && (
          <>
            <DashbordSmallBox
              title={"Total Income"}
              amount={transactions["incomeAmount"]}
              color={"bg-green-200 text-green-500"}
              percentage={percentages.totalIncome}
            />
            <DashbordSmallBox
              title={"Total Saves"}
              amount={transactions["currentAmount"]}
              color={"bg-green-200 text-green-500"}
              percentage={percentages.totalSaves}
            />
            <DashbordSmallBox
              title={"Total Expense"}
              amount={transactions["expenseAmount"]}
              color={"bg-red-200 text-red-500"}
              percentage={percentages.totalExpense}
            />
            <DashbordSmallBox
              title={"Upcoming"}
              amount={transactions["upcoming"]}
              color={"bg-black text-white"}
            />
          </>
        )}
      </div>
      {/* third row */}
      <div className="flex flex-col me-5 md:flex-row gap-6">
        <LatestPayment />
        <LatestClients />
      </div>
    </main>
  );
});

export default Dashboard;
