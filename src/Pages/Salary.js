import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { PAGELIMIT } from "../Constants/Index";
import ReactPaginate from "react-paginate";
import _ from "lodash";
// import StatusBadge from "../components/StatusBadge";

const Salary = () => {
  const [salaries, setSalaries] = useState([]); // Initially, there is no data
  const [status, setStatus] = useState("Pending"); // Initially, status is pending
  const [pageCount, setPageCount] = useState(1);
  const [showAdvanceSalaryModal, setShowAdvanceSalaryModal] = useState(false);
  const [showAdvancePaymentModal, setShowAdvancePaymentModal] = useState(false);
  const [employees, setEmployees] = useState([]); // Initially, there is no data
  const [advancePaymentEmployee, setAdvancePaymentEmployee] = useState({}); // Initially, there is no data
  const [advanceSalaryAmount, setAdvanceSalaryAmount] = useState(0); // Initially, there is no data
  const currentPage = useRef(1);

  const getEmployeePaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/employees?page=${currentPage.current}&limit=${PAGELIMIT}`
      );
      if (res.data.success) {
        const data = res.data.data;
        setPageCount(data.totalPages); // Use total pages from the response
        setEmployees(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmployeePageClick = (e) => {
    const selectedPage = e.selected + 1;
    currentPage.current = selectedPage;
    getPaginatedData(selectedPage); // Fetch data for the selected page
  };

  const getPaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/pendingSalary?page=${currentPage.current}&limit=${PAGELIMIT}&status=${status}`
      );
      if (res.data.success) {
        const data = res.data.data;
        setPageCount(data.totalPages); // Use total pages from the response
        setSalaries(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedGetPaginatedData = useRef(
    _.debounce(() => {
      getPaginatedData(); // Use the defined getPaginatedData function
    }, 500)
  ).current;
  //Filter by status
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    currentPage.current = 1; // Reset current page when status changes
    debouncedGetPaginatedData(); // Debounced API call
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    currentPage.current = selectedPage;
    getPaginatedData(selectedPage); // Fetch data for the selected page
  };
  const giveSalary = async (id) => {
    try {
      const res = await axios.patch(`/api/v1/users/giveSalary?id=${id}`);
      if (res.data.success) {
        getPaginatedData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const giveAdvanceSalary = async (id) => {
    try {
      return console.log(id);
      const res = await axios.patch(`/api/v1/users/giveAdvanceSalary?id=${id}`);
      if (res.data.success) {
        getPaginatedData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Initial fetch
    getPaginatedData();
    getEmployeePaginatedData();
    return () => {
      // Cleanup function to cancel the debounced function on unmount or status/page change
      debouncedGetPaginatedData.cancel();
    };
  }, [status, currentPage, debouncedGetPaginatedData]);
  return (
    <>
      {/* Employee Data */}
      <div className="relative mx-5 ">
        {showAdvanceSalaryModal ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Employees</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setShowAdvanceSalaryModal(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <div className="mt-6 overflow-auto">
                    <table className="w-full whitespace-nowrap">
                      <thead className="text-md">
                        <tr>
                          <th className="px-6 py-3">Sn.</th>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Salary</th>
                          <th className="px-6 py-3">Adv. Salary</th>
                          <th className="px-6 py-3">Mobile</th>
                          <th className="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees && employees.length > 0 ? (
                          employees.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-6 py-3 text-center">
                                {idx + 1}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {item.name}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {item.salary}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {item.advanceSalary}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {item.mobile}
                              </td>
                              <td className="px-6 py-3 text-center">
                                <button
                                  className="myCustomBtn px-3 py-1 rounded whitespace-nowrap"
                                  onClick={() => {
                                    const data = {
                                      id: item._id,
                                      name: item.name,
                                      mobile: item.mobile,
                                      salary: item.salary,
                                    };
                                    setAdvancePaymentEmployee(data);
                                    setShowAdvancePaymentModal(true);
                                    setShowAdvanceSalaryModal(false);
                                  }}
                                >
                                  Pay
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              className="text-center text-red-600"
                              colSpan={5}
                            >
                              No data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handleEmployeePageClick}
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
                  </div>
                  <div className="relative p-6 flex-auto"></div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      {/* Advance Payment Data */}
      <div className="relative mx-5 ">
        {showAdvancePaymentModal ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Advance Salary</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setShowAdvancePaymentModal(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <form>
                    <div className="mt-6 overflow-auto">
                      <div className="mt-6 overflow-auto">
                        <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                          <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Name
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed myCustomBtn"
                                placeholder="Enter Advance Salary Amount"
                                value={advancePaymentEmployee.name}
                                disabled
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Salary
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed myCustomBtn"
                                value={advancePaymentEmployee.salary}
                                disabled
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Mobile
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed myCustomBtn"
                                value={advancePaymentEmployee.mobile}
                                disabled
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Amount
                              </div>
                              <input
                                type="number"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Advance Salary Amount"
                                value={advanceSalaryAmount}
                                onChange={(e) =>
                                  setAdvanceSalaryAmount(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative p-6 flex-auto"></div>
                    <div className="my-3 flex items-center justify-end mx-16">
                      <button
                        className="myCustomBtn px-3 py-1 rounded my-5"
                        disabled={!advanceSalaryAmount}
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          giveAdvanceSalary(advancePaymentEmployee.id);
                        }}
                      >
                        Pay Advance Salary
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <header className="flex justify-between mx-10 mt-12">
        <button
          className="myCustomBtn px-3 py-1 rounded"
          onClick={() => setShowAdvanceSalaryModal(true)}
        >
          Advance Salary
        </button>
        <select
          className="myCustomBtn px-3 justify-start py-3 border-0 rounded text-start cursor-pointer"
          onChange={handleStatusChange}
          value={status}
        >
          <option value={"Pending"}>Pending</option>
          <option value={"Paid"} className="">
            Paid
          </option>
        </select>
      </header>
      <main className="overflow-x-auto mx-7 mt-6 rounded-lg">
        <table className="text-md text-left bg-white w-1/2 mx-auto  whitespace-nowrap">
          <thead className="text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sn.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Adv. Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              {status === "Pending" && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {salaries && salaries.length > 0 ? (
              salaries.map((item, idx) => (
                <tr className="bg-white border-b" key={idx}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 border-2 border-black rounded-full overflow-hidden">
                      <img src={item.pic} alt="" />
                    </div>
                  </td>
                  <td className="px-6 py-4 ">{item.mobile}</td>
                  <td className="px-6 py-4 ">{item.advanceSalary}</td>
                  <td className="px-6 py-4 ">{item.salary}</td>
                  {status === "Pending" && (
                    <td className="px-6 py-4">
                      <button
                        className="myCustomBtn px-3 py-1 rounded"
                        onClick={() => giveSalary(item._id)}
                      >
                        Pay
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 text-center text-red-600" colSpan={7}>
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

export default Salary;
