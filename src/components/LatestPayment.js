import axios from "axios";
import React, { useEffect, useState } from "react";

function LatestPayment() {
  const [transactions, setTransactions] = useState([]); // Initially, there is no data
  const getRecentTransactions = async () => {
    try {
      const res = await axios.get(`/api/v1/users/transactions?limited=5`);
      if (res.data.success) {
        setTransactions(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecentTransactions();
  }, []);
  return (
    <div className="ChartTransactions w-full md:w-6/12 h-auto px-6 py-6 bg-white rounded-2xl flex-col justify-start items-start gap-6 ">
      <div className="Top self-stretch justify-between items-start inline-flex">
        <div className="LatestTransactions text-black text-xl font-black">
          Latest Transactions
        </div>
        <div className="IconsThreeDots w-6 h-6 relative" />
      </div>
      <div className="Transactions self-stretch grow shrink basis-0 flex-col justify-start items-start gap-2.5 flex">
        {transactions &&
          transactions.length > 0 &&
          transactions.map((item, idx) => (
            <>
              <div
                // className="self-stretch grow shrink basis-0 py-2.5 justify-start items-start md:items-center gap-5 inline-flex  flex-col sm:flex-row"
                className="flex justify-between w-full mt-5 border-b-4 border-gray-100 py-1"
                key={idx}
              >
                <div className="justify-start items-start gap-5 flex">
                  <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="TransferToJohdi">
                      <span className="text-indigo-600 text-base font-extrabold ">
                        {item.name}
                      </span>
                    </div>
                    <div className="PersonalPayment text-gray-400 text-sm font-bold ">
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-11 pl-2.5 py-2.5 justify-start items-start gap-2.5 flex">
                  <div className="3500 grow shrink basis-0 self-stretch text-right text-red-500 text-lg font-extrabold whitespace-nowrap">
                    <span className="text-black text-base font-extrabold ">
                      {item.type === "Income" ? (
                        <span className="text-green-500 text-base font-extrabold ">
                          +₹{item.amount}
                        </span>
                      ) : item.type === "Expense" ? (
                        <span className="text-red-500 text-base font-extrabold ">
                          -₹{item.amount}
                        </span>
                      ) : (
                        <span className="text-red-500 text-base font-extrabold ">
                          -₹{item.amount}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default LatestPayment;
