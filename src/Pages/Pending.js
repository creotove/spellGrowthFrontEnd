import React, { useContext, useEffect, useRef } from "react";
import _ from "lodash";
import StatusBadge from "../components/StatusBadge";
import { useState } from "react";
import { PAGELIMIT } from "../Constants/Index";
import axios from "axios";
import ReactPaginate from "react-paginate";
import DateFormater from "../components/DateFormater";
import InvoiceContext from "../context/InvoiceContext";
import PreviewInvoicePending from "./PreviewInvoicePending";

const Pending = () => {
  const [status, setStatus] = useState("Pending");
  const [invoices, setInvoices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const { setInvoice } = useContext(InvoiceContext);

  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  const getPaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/invoices?page=${
          page || currentPage.current
        }&limit=${PAGELIMIT}&status=${status}`
      );
      if (res.data.success) {
        const data = res.data.data;
        if (data.results.length === 0) {
          setInvoices(data.results);
        } else {
          setPageCount(data.totalPages);
          setInvoices(data.results);
        }
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

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    currentPage.current = selectedPage;
    debouncedGetPaginatedData(); // Debounced API call
  };

  //Filter by status
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    currentPage.current = 1; // Reset current page when status changes
    debouncedGetPaginatedData(); // Debounced API call
  };

  // Change status of invoice 
  const changeSatatus = async (id) => {
    try {
      const res = await axios.patch(`/api/v1/users/changeStatus?id=${id}`);
      if (res.data.success) {
        setVisible(false);
        getPaginatedData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Initial fetch
    getPaginatedData();
    return () => {
      // Cleanup function to cancel the debounced function on unmount or status/page change
      debouncedGetPaginatedData.cancel();
    };
  }, [status, currentPage, debouncedGetPaginatedData]);
  return (
    <>
      <div className="relative mx-5 mt-12">
        {visible ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Invoice Details</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setVisible(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <div className="mt-6 overflow-auto">
                    <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                      <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                        <div className="my-3">
                          <p className="">Invoice Number</p>
                          <p className="">{invoiceDetails?.invoiceNumber}</p>
                        </div>{" "}
                        <div className="my-3">
                          <p className="">Name</p>
                          <p className="">{invoiceDetails.name}</p>
                        </div>
                        <div className="my-3">
                          <p className="">Phone</p>
                          <p className="">{invoiceDetails.phone}</p>
                        </div>{" "}
                        <div className="my-3">
                          <p className="">Email</p>
                          <p className="">{invoiceDetails.email}</p>
                        </div>
                        <div className="my-3">
                          <p className="">Created Date</p>
                          <p className="">
                            {DateFormater(invoiceDetails.createdAt)}
                          </p>
                        </div>
                        <div className="my-3">
                          <p className="">Due Date</p>
                          <p className="">{invoiceDetails.dueDate}</p>
                        </div>{" "}
                        <div className="my-3">
                          <p className="">Payment Method</p>
                          <p className="">{invoiceDetails.paymentMethod}</p>
                        </div>
                        <div className="my-3 w-full">
                          <p className="text-xl">Services</p>
                          <table className="whitespace-nowrap">
                            <thead>
                              <tr className="border-b">
                                <th className="px-3 py-1">SN.</th>
                                <th className="px-3 py-1">Description</th>
                                <th className="px-3 py-1">Sub Description</th>
                                <th className="px-3 py-1">Quantity</th>
                                <th className="px-3 py-1">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoiceDetails.services.map((service, idx) => (
                                <tr className="border-b" key={idx + 1}>
                                  <td className="px-3 py-1">{idx + 1}</td>
                                  <td className="px-3 py-1">
                                    {service.description}
                                  </td>
                                  <td className="px-3 py-1">
                                    {service.subDescription}
                                  </td>
                                  <td className="px-3 py-1">
                                    {service.quantity}
                                  </td>
                                  <td className="px-3 py-1">
                                    {service.serviceAmount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="my-3 overflow-auto">
                          <p className="text-xl">Advance Amount</p>
                          <p className="">{invoiceDetails.advanceAmount}</p>
                        </div>{" "}
                        <div className="my-3 overflow-auto">
                          <p className="text-xl">Total Amount</p>
                          <p className="">{invoiceDetails.totalAmount}</p>
                        </div>
                        <div className="my-3 overflow-auto">
                          <button
                            className="myCustomBtn px-3 py-1"
                            onClick={() => {
                              setInvoice(invoiceDetails);
                              setVisible(false);
                              setInvoiceVisible(true);
                            }}
                          >
                            Preview or Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                    {invoiceDetails.status === "Paid" ? (
                      <button
                        className="myCustomBtn  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={(e) => {
                          setVisible(false);
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        className="myCustomBtn  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          changeSatatus(invoiceDetails._id);
                        }}
                      >
                        Change to Paid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="relative mx-5 ">
        {invoiceVisible ? (
          <>
            <div className="absolute w-full -top-10">
              <div className="bg-black opacity-60 w-full h-full absolute"></div>
              <header className="flex justify-end mx-10 mt-10 relative">
                <button
                  className="myCustomBtn p-3 rounded-md"
                  onClick={() => {
                    setInvoiceVisible(false);
                  }}
                >
                  X
                </button>
              </header>
              <PreviewInvoicePending />
            </div>
          </>
        ) : null}
      </div>

      <header className="flex justify-end mx-10">
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
        <table className="text-md text-left bg-white w-1/2 mx-auto whitespace-nowrap">
          <thead className="text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sn.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              {/* <th scope="col" className="px-6 py-3 ">
                Created Date
              </th> */}
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Method
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices && invoices.length > 0 ? (
              invoices.map((invoice, idx) => (
                <tr className="bg-white border-b" key={idx + 1}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{invoice.client_id.name}</td>
                  <td className="px-6 py-4">{invoice.client_id.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.totalAmount + invoice.advanceAmount}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="myCustomBtn px-3 py-1 rounded whitespace-nowrap"
                      onClick={() => {
                        setVisible(true);
                        const invoiceD = {
                          _id: invoice._id,
                          name: invoice.client_id.name,
                          phone: invoice.client_id.mobile,
                          email: invoice.client_id.email,
                          invoiceNumber: invoice.invoiceNumber,
                          dueDate: invoice.dueDate,
                          totalAmount: invoice.totalAmount,
                          advanceAmount: invoice.advanceAmount,
                          status: invoice.status,
                          services: invoice.services,
                        };
                        setInvoiceDetails(invoiceD);
                      }}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 text-center text-red-600" colSpan={8}>
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
        nextClassName="px-1 bg-white border-1 border-black rounded w-min mx-1 py-1 "
        nextLinkClassName="disabled:bg-slate-400"
        activeClassName="px-1 myCustomBtn rounded w-min mx-1 py-1"
      />
    </>
  );
};

export default Pending;
