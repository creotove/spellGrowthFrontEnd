import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/icons/back.png";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { PAGELIMIT } from "../Constants/Index";
import DateFormater from "../components/DateFormater";

function AllotWork() {
  const navigate = useNavigate();
  const [work, setWork] = useState([]);
  const [employeeList, setEmployeeList] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);
  const getPaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/workNotAlloted?page=${currentPage.current}&limit=${PAGELIMIT}`
      );
      if (res.data.success) {
        const data = res.data.data;
        setPageCount(data.totalPages); // Use total pages from the response
        setWork(data.results);
        console.log(data.results);
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

  useEffect(() => {
    getPaginatedData();
    getEmployeePaginatedData();
  }, []);

  return (
    <>
      <header className="flex justify-between mx-10 mt-12">
        <button
          className="myCustomBtn p-3 rounded-md flex"
          onClick={() => {
            navigate("/employee");
          }}
        >
          <img src={back} alt="Back" className="h-5" />
        </button>
      </header>
      <div className="relative mx-5 ">
        {employeeList ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full ">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Employee Details</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setEmployeeList(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <div className="mt-6 overflow-auto">
                    <div>
                      <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                        <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                          <div className="my-3 w-full">
                            <table className="mx-auto">
                              <thead>
                                <tr>
                                  <th className="px-6 py-2">Sn</th>
                                  <th className="px-6 py-2">Name</th>
                                  <th className="px-6 py-2">Expertize</th>
                                  <th className="px-6 py-2">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employees && employees.length > 0
                                  ? employees.map((employee, idx) => (
                                      <tr key={idx} className="border-b">
                                        <td className="px-6 py-2">{idx + 1}</td>
                                        <td className="px-6 py-2">
                                          {employee.name}
                                        </td>
                                        <td className="px-6 py-2">
                                          {employee.expertize}
                                        </td>
                                        <td className="px-6 py-2">
                                          <button className="myCustomBtn px-3 py-1 rounded">
                                            Allot
                                          </button>
                                        </td>
                                      </tr>
                                    ))
                                  : null}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handleEmployeePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={2}
                        containerClassName="justify-center flex items-center my-5 whitespace-nowrap"
                        pageClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1"
                        pageLinkClassName="page-link"
                        previousClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1"
                        previousLinkClassName="page-link"
                        nextClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1"
                        nextLinkClassName="page-link"
                        activeClassName="px-1 myCustomBtn rounded w-min mx-1 py-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <main className="overflow-x-auto mx-7 mt-6 rounded-lg">
        <table className="text-md text-left bg-white w-1/2 mx-auto whitespace-nowrap">
          <thead class="text-md">
            <tr>
              <th scope="col" class="px-6 py-3">
                Sn.
              </th>

              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Service
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Due date
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {work && work.length > 0 ? (
              work.map((work, idx) => (
                <tr class="bg-white border-b" key={idx}>
                  <td class="px-6 py-4">{idx + 1}</td>
                  <td class="px-6 py-4">{work.client_id.name}</td>
                  <td class="px-6 py-4 whitespace-break-spaces">
                    {work.services.length > 1
                      ? work.services[0].description + "..."
                      : work.services[0].description}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {DateFormater(work.createdAt)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      {work.dueDate}
                    {/* {work.serviceDuration === "Monthly"
                      : work.serviceDuration === "One Time"
                      ? work.dueDate
                      : work.serviceDuration === "Yearly"
                      ? (work.createdAt = DateFormater(
                          new Date(work.createdAt).setDate(
                            new Date(work.createdAt).getDate() + 365
                          )
                        ))
                      : null} */}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      className="myCustomBtn px-3 py-1 rounded"
                      onClick={() => setEmployeeList(true)}
                    >
                      Allot work
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr class="bg-white border-b">
                <td colSpan={6} className="text-center text-red-500 py-3">
                  No data found
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
}

export default AllotWork;
