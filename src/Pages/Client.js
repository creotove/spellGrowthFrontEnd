import React, { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { PAGELIMIT } from "../Constants/Index";
import { Link } from "react-router-dom";
import DateFormater from "../components/DateFormater";

const Client = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [webURL, setWebURL] = useState("N/A");
  const [instaURL, setInstaURL] = useState("N/A");
  const [file, setFile] = useState("");
  const [referedBy, setReferedBy] = useState("N/A");
  const [clients, setClients] = useState([]);
  const [modalClient, setModalClient] = useState([]);
  const [refered, setRefered] = useState(false);
  const [searchClient, setSearchClient] = useState(false);
  const [viewMoreVisible, setViewMoreVisible] = useState(false);

  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("clientId", clientId);
      formData.append("businessName", businessName);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("websiteUrl", webURL);
      formData.append("instagramUrl", instaURL);
      formData.append("pic", file);
      formData.append("refer", referedBy);

      const res = await axios.post("/api/v1/users/addClient", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setVisible(false);
        setName("");
        setBusinessName("");
        setMobile("");
        setEmail("");
        setCity("");
        setState("");

        setWebURL("N/A");
        setInstaURL("N/A");
        setFile("");
        setReferedBy("N/A");
        console.log("Client Added Successfully");
        getPaginatedData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPaginatedData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/users/clients?page=${currentPage.current}&limit=${PAGELIMIT}`
      );
      if (res.data.success) {
        const data = res.data.data;
        if (data.results.length === 0) {
        } else {
          setPageCount(data.totalPages); // Use total pages from the response
          setClients(data.results);
        }
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
  // SG 456789
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/v1/users/clients?refer=${referedBy}`);
      if (res.data.success) {
        setSearchClient(true);
        setRefered(true);
      } else {
        setSearchClient(true);
        setRefered(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPaginatedData();
  }, []);

  return (
    <>
      {/* <div className={`${viewMoreVisible ? " bg-black h-full w-full bg-opacity-50" : ""}`}> */}

      <div className={`${viewMoreVisible ? "relative  h-full w-full" : ""}`}>
        <div
          className={`${
            viewMoreVisible
              ? "bg-black opacity-60 w-full h-full absolute"
              : "hidden"
          }`}
        ></div>
        {viewMoreVisible ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full mx-5 mt-12">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Client Details</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setViewMoreVisible(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <div className="mt-6 overflow-auto">
                    <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                      <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                        <div className="my-3">
                          <p className="text-sm">Name</p>
                          <p className="text-xl">{modalClient.name}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Business Name</p>
                          <p className="text-xl">{modalClient.businessName}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Mobile</p>
                          <p className="text-xl">{modalClient.mobile}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Email</p>
                          <p className="text-xl">{modalClient.email}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">City</p>
                          <p className="text-xl">{modalClient.city}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">State</p>
                          <p className="text-xl">{modalClient.state}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Website URL</p>
                          <p className="text-xl">
                            {modalClient.websiteUrl === "N/A" ? (
                              <p className="text-red-500">N/A</p>
                            ) : (
                              <Link>{modalClient.instagramUrl}</Link>
                            )}
                          </p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Instagram</p>
                          <p className="text-xl">
                            {modalClient.instagramUrl === "N/A" ? (
                              <p className="text-red-500">N/A</p>
                            ) : (
                              <Link>{modalClient.instagramUrl}</Link>
                            )}
                          </p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Refered By</p>
                          <p className="text-xl">
                            {modalClient.referedBy === "N/A" ? (
                              <p className="text-red-500">N/A</p>
                            ) : (
                              modalClient.instagramUrl
                            )}
                          </p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Commission</p>
                          <p className="text-xl">{modalClient.commission}</p>
                        </div>
                        <div className="my-3">
                          <p className="text-sm">Refernced</p>
                          <p className="text-xl">{modalClient.referenced}</p>
                        </div>
                      </div>
                      {modalClient.invoices && modalClient.invoices.length === 0 ? (
                        <p className="text-2xl text-center text-red-500 my-5">No Invoice Found</p>
                      ) : (
                        <>
                          <div className="mx-10 mt-5 overflow-auto">
                            <div className="">
                              <p className="text-2xl">Invoice Details</p>

                              <table className="whitespace-nowrap">
                                <thead>
                                  <tr className="border-b">
                                    <th className="px-3 py-1">Sn.</th>
                                    <th className="px-3 py-1">Invoice No.</th>
                                    <th className="px-3 py-1">Amount</th>
                                    <th className="px-3 py-1">
                                      Payment Status
                                    </th>
                                    <th className="px-3 py-1">On boarding</th>
                                    <th className="px-3 py-1">Due Date</th>
                                    <th className="px-3 py-1">Payment Mode</th>
                                    <th className="px-3 py-1">
                                      Online Payment Mode
                                    </th>
                                    <th className="px-3 py-1">
                                      Service Duration
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {modalClient.invoices.map((invoice, idx) => (
                                    <tr key={invoice._id}>
                                      <td className="px-3 py-1">{idx + 1}</td>
                                      <td className="px-3 py-1">
                                        {invoice.invoiceNumber}
                                      </td>
                                      <td className="px-3 py-1">
                                        {invoice.totalAmount +
                                          invoice.advanceAmount}
                                      </td>
                                      <td className="px-3 py-1">
                                        {invoice.status}
                                      </td>
                                      <td className="px-3 py-1">
                                        {DateFormater(invoice.createdAt)}
                                      </td>
                                      <td className="px-3 py-1">
                                        {invoice.dueDate}
                                      </td>
                                      <td className="px-3 py-1">
                                        {invoice.paymentMethod}
                                      </td>
                                      <td className="px-3 py-1">
                                        {invoice.onlinePaymentMethod}
                                      </td>
                                      <td className="px-3 py-1">
                                        {invoice.serviceDuration}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="mx-10 my-5">
                            <div className="">
                              <p className="text-2xl">Service Details</p>

                              <table className="whitespace-nowrap">
                                <thead>
                                  <tr className="border-b">
                                    <th className="px-3 py-1">Sn.</th>
                                    <th className="px-3 py-1">Description</th>
                                    <th className="px-3 py-1">
                                      Sub Description
                                    </th>
                                    <th className="px-3 py-1">Quantity</th>
                                    <th className="px-3 py-1">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {modalClient.invoices.map((invoice) =>
                                    invoice.services.map((service, idx) => (
                                      <tr key={invoice._id}>
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
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/*footer*/}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {/* </div> */}
      <div className={`${viewMoreVisible ? " hidden" : "block mt-12"}`}>
        <header className="flex justify-end mx-10">
          <button
            className="myCustomBtn p-3 rounded-md"
            onClick={() => {
              setVisible(true);
            }}
          >
            Add client
          </button>
        </header>

        <div className="w-full">
          {visible ? (
            <>
              <div className="justify-center items-center flex overflow-auto absolute top-0 z-50 outline-none focus:outline-none mx-10">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-2xl">Add Client</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                        onClick={() => setVisible(false)}
                      >
                        x
                      </button>
                    </div>
                    {/*body*/}
                    <form autoComplete="off">
                      <div className="mt-6">
                        <div className="flex flex-col justify-center dark:bg-black  ">
                          <div className="flex flex-wrap gap-x-10 mx-10 my-1 justify-start">
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Name
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Business Name
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Business name"
                                value={businessName}
                                onChange={(e) =>
                                  setBusinessName(e.target.value)
                                }
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Mobile
                              </div>
                              <input
                                type="number"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Email
                              </div>
                              <input
                                type="email"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                City
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                State
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>

                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Website URL
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Website URL"
                                value={webURL}
                                onChange={(e) => setWebURL(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Instagram URL
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Insta URL"
                                value={instaURL}
                                onChange={(e) => setInstaURL(e.target.value)}
                              />
                            </div>

                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Profile
                              </div>
                              <input
                                type="file"
                                className={`w-48 h-9 bg-white rounded ${
                                  file ? "text-green-500" : "text-red-500"
                                }`}
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Client Id
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed"
                                placeholder="Enter Client Id"
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                disabled
                              />
                              <button
                                className="myCustomBtn px-3 py-1 rounded ms-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const cId = mobile.slice(-6);
                                  setClientId(`SG-${cId}`);
                                }}
                                disabled={
                                  mobile.length <= 9 || mobile.length > 10
                                    ? true
                                    : false
                                }
                              >
                                Generate
                              </button>
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Refer(Optional)
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Enter Refer Client"
                                value={referedBy}
                                onChange={(e) => setReferedBy(e.target.value)}
                              />
                              {/* SG 456789 */}
                              {searchClient ? (
                                <span
                                  className={`${
                                    refered ? "text-green-500" : "text-red-500"
                                  }`}
                                >
                                  {refered
                                    ? "Client Found"
                                    : "Client Not Found"}
                                </span>
                              ) : null}
                              <button
                                className="myCustomBtn px-3 py-1 rounded ms-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleSearch();
                                }}
                                disabled={referedBy === "N/A" ? true : false}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative p-6 flex-auto"></div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="myCustomBtn  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          disabled={
                            !name ||
                            !businessName ||
                            !email ||
                            !city ||
                            !state ||
                            !file ||
                            !clientId ||
                            !referedBy
                          }
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          Add
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

        <main className="overflow-x-auto mx-7 mt-6 rounded-lg">
          <table className="text-md text-left bg-white w-1/2 mx-auto whitespace-nowrap">
            <thead className="text-md">
              <tr>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  Sn.
                </th>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  Pic
                </th>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  Name
                </th>
                <th
                  scope="col"
                  className="md:px-6 md:py-3 px-1 py-1 whitespace-nowrap"
                >
                  Client ID
                </th>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  Business Name
                </th>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  Mobile
                </th>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  City
                </th>
                <th scope="col" className="md:px-6 md:py-3 px-3 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {clients && clients.length > 0 ? (
                clients.map((user, idx) => (
                  <tr className="bg-white border-b" key={idx + 1}>
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 border-2 border-black overflow-hidden rounded-full">
                        <img src={user.pic} alt="Client Pic"></img>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.clientId}
                    </td>
                    <td className="px-6 py-4">{user.businessName}</td>
                    <td className="px-6 py-4">{user.mobile}</td>
                    <td className="px-6 py-4">{user.city}</td>
                    <td className="px-6 py-4">
                      <button
                        className="myCustomBtn px-3 py-1 rounded"
                        onClick={() => {
                          setViewMoreVisible(true);

                          const data = {
                            name: user.name,
                            clientId: user.clientId,
                            businessName: user.businessName,
                            mobile: user.mobile,
                            email: user.email,
                            city: user.city,
                            state: user.state,
                            websiteUrl: user.websiteUrl,
                            instagramUrl: user.instagramUrl,
                            referedBy: user.referedBy,
                            invoices: user.invoices,
                            commission: user.commission,
                            referenced: user.referenced.length,
                          };
                          setModalClient(data);
                        }}
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td
                    className="px-6 py-4 text-center text-red-600"
                    colSpan={8}
                  >
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
      </div>
    </>
  );
};

export default Client;
// {visible ? (
//   <>
//     <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto no-scrollbar fixed inset-0 z-50 outline-none focus:outline-none">
//       <div className="relative w-auto my-6 mx-auto max-w-3xl">
//         {/*content*/}
//         <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//           {/*header*/}
//           <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//             <h3 className="text-2xl">Add Client</h3>
//             <button
//               className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
//               onClick={() => setVisible(false)}
//             >
//               x
//             </button>
//           </div>
//           {/*body*/}
//           <div className="flex flex-wrap gap-3 mx-10 my-1 justify-center">
//             <InputField />
//             <InputField />
//             <InputField />
//             <InputField />
//             <InputField />
//             <InputField />
//           </div>
//           <div className="relative p-6 flex-auto"></div>
//           {/*footer*/}
//           <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//             <button
//               className="myCustomBtn  font-bold uppercase text-sm md:px-6 md:py-3 px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//               type="button"
//               onClick={() => setVisible(false)}
//             >
//               Add Client
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//   </>
// ) : null}
