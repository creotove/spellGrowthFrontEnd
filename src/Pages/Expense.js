import React, { useEffect, useRef, useState } from "react";
import DateFormater from "../components/DateFormater";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { PAGELIMIT } from "../Constants/Index";

const Expense = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  const getPaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/expenses?page=${currentPage.current}&limit=${PAGELIMIT}`
      );
      if (res.data.success) {
        const data = res.data.data;
        setPageCount(data.totalPages); // Use total pages from the response
        setExpenses(data.results);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name,
        description,
        amount,
        date,
      };
      const res = await axios.post("/api/v1/users/addExpense", data);
      if (res.data.success) {
        setName("");
        setDescription("");
        setAmount("");
        setVisible(false);
        console.log("Asset added successfully");
        getPaginatedData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDate(DateFormater());
    getPaginatedData();
  }, []);
  return (
    <>
      <header className="flex justify-end mx-10 mt-12">
        <button
          className="myCustomBtn p-3 rounded-md"
          onClick={() => {
            setVisible(true);
          }}
        >
          Add expense
        </button>
      </header>

      <div className="relative mx-5 ">
        {visible ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full ">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Expense Details</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setVisible(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <form className="mt-6 overflow-auto">
                    <div>
                      <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                        <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                          <div className="my-3 ">
                            <div className="text-black font-normal ">Name</div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter Expense Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Description
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter Descri[tion"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Amount
                            </div>
                            <input
                              type="number"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">Date</div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="DD-MM-YYYY"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="myCustomBtn  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        disabled={
                        !name ||
                        !amount ||
                        !date ||
                        name === "" ||
                        amount === ""
                      }
                      >
                        Add Expense
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <main className="overflow-x-auto mx-7 mt-6 rounded-lg">
        <table className="text-md text-left bg-white w-1/2 mx-auto">
          <thead className="text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sn.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th><th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.length > 0 ? (
              expenses.map((expense, idx) => (
                <tr className="bg-white border-b" key={idx}>
                  <td className="px-6 py-4">{idx+1}</td>
                  <td className="px-6 py-4">{expense.name}</td>
                  <td className="px-6 py-4">{expense.description}</td>
                  <td
                    className="px-6 py-4"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {DateFormater(expense.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expense.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 text-center text-red-600" colSpan={5}>
                  No data Found
                </td>
              </tr>
            )}
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

export default Expense;
