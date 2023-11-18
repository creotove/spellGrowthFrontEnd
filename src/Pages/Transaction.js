import React, { useEffect, useRef, useState } from "react";
// import StatusBadge from "../components/StatusBadge";
import axios from "axios";
import { PAGELIMIT } from "../Constants/Index";
import ReactPaginate from "react-paginate";
import DateFormater from "../components/DateFormater";

const Transaction = () => {
  const [transactionType, setTransactionType] = useState("Pending");
  const [transactions, setTransactions] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  const getPaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/transactions?page=${currentPage.current}&limit=${PAGELIMIT}`
      );
      if (res.data.success) {
        const data = res.data.data;
        setPageCount(data.totalPages); // Use total pages from the response
        setTransactions(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    currentPage.current = selectedPage;
    getPaginatedData(selectedPage); // Fetch data for the selected page
  };

  useEffect(() => {
    getPaginatedData();
  }, []);

  return (
    <>
      {/* <header className="flex justify-end mx-10">
        <select
          className="myCustomBtn px-3 justify-start py-3 border-0 rounded text-start cursor-pointer"
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value={"Pending"}>Expense</option>
          <option value={"Paid"} className="">
            Income
          </option>
        </select>
      </header> */}
      <main className="overflow-x-auto mx-7 mt-12 rounded-lg">
        <table className="text-md text-left bg-white w-1/2 mx-auto whitespace-nowrap">
          <thead className="text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sn.
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((item, idx) => (
                <tr className="bg-white border-b" key={idx + 1}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{DateFormater(item.createdAt)}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.remainingBalance}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 text-center text-red-600" colSpan={7}>
                  No data Found
                </td>
              </tr>
            )}
            {/* 
            <tr className="bg-white border-b">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4 whitespace-nowrap">09-11-23</td>
              <td className="px-6 py-4">Israr</td>
              <td className="px-6 py-4 whitespace-nowrap">20000</td>
              <td className="px-6 py-4 whitespace-nowrap">Expense</td>
              <td className="px-6 py-4 whitespace-pre-wrap">
                Advance Amount of client
              </td>
              <td className="px-6 py-4 whitespace-nowrap">5000</td>
            </tr> */}
          </tbody>
        </table>
      </main>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="justify-center flex items-center mt-5 whitespace-nowrap"
        pageClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1"
        pageLinkClassName="page-link"
        previousClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1"
        previousLinkClassName="page-link"
        nextClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1"
        nextLinkClassName="page-link"
        activeClassName="px-1 myCustomBtn rounded w-min mx-1 py-1"
      />
    </>
  );
};

export default Transaction;
