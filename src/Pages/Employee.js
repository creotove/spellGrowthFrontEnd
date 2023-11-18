import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateFormater from "../components/DateFormater";
import axios from "axios";
import { PAGELIMIT } from "../Constants/Index";
import ReactPaginate from "react-paginate";

const Employee = () => {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [expertize, setExpertize] = useState("");
  const [experience, setExperience] = useState();
  const [salary, setSalary] = useState();
  const [currentAddress, setCurrentAddress] = useState("");
  const [governmentIdName, setGovernmentIdName] = useState("");
  const [governmentIdNumber, setGovernmentIdNumber] = useState("");
  const [file, setFile] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [paypal, setPaypal] = useState("N/A");
  const [date, setDate] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState({});

  const [employees, setEmloyees] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  const getPaginatedData = async (page) => {
    try {
      const res = await axios.get(
        `/api/v1/users/employees?page=${currentPage.current}&limit=${PAGELIMIT}`
      );
      if (res.data.success) {
        const data = res.data.data;
        setPageCount(data.totalPages); // Use total pages from the response
        setEmloyees(data.results);
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
      const formData = new FormData();
      formData.append("pic", file);
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("qual", qualification);
      formData.append("expertize", expertize);
      formData.append("exp", experience);
      formData.append("salary", salary);
      formData.append("address", currentAddress);
      formData.append("governmentIdName", governmentIdName);
      formData.append("governmentIdNumber", governmentIdNumber);
      formData.append("bankName", bankName);
      formData.append("ifscCode", ifscCode);
      formData.append("date", date);
      const res = await axios.post("/api/v1/users/addEmployee", formData);
      if (res.data.success) {
        setVisible(false);
        setName("");
        setMobile("");
        setEmail("");
        setQualification("");
        setExpertize("");
        setExperience("");
        setSalary("");
        setCurrentAddress("");
        setGovernmentIdName("");
        setGovernmentIdNumber("");
        setFile("");
        setBankName("");
        setIfscCode("");
        setDate(DateFormater());
        console.log("Employee added successfully");
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

  const navigate = useNavigate();

  return (
    <>
      <div className="relative mx-5 mt-12">
        {profileVisible ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Employee Details</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setProfileVisible(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <div className="mt-6 overflow-auto">
                    <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                      <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                        <div className="my-3 flex-1">
                          <p className="">Name</p>
                          <p className="">{employeeDetails.name}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Phone</p>
                          <p className="">{employeeDetails.mobile}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Email</p>
                          <p className="">{employeeDetails.email}</p>
                        </div>
                        {employeeDetails.createdAt ? (
                          <div className="my-3 flex-1">
                            <p className="">Created Date</p>
                            <p className="">
                              {DateFormater(employeeDetails.createdAt)}
                            </p>
                          </div>
                        ) : null}
                        <div className="my-3 flex-1">
                          <p className="">Salary</p>
                          <p className="">{employeeDetails.salary}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Expertize</p>
                          <p className="">{employeeDetails.expertize}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Qualifications</p>
                          <p className="">{employeeDetails.qual}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Experience</p>
                          <p className="">{employeeDetails.exp}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Advance Salary</p>
                          <p className="">{employeeDetails.advanceSalary}</p>
                        </div>
                        <div className="my-3 flex-1">
                          <p className="">Salary Status</p>
                          <p className="">{employeeDetails.salaryStatus}</p>
                        </div>
                        <div className="my-3 w-full">
                          <p className="text-xl">Government Proof </p>
                          <table className="whitespace-nowrap">
                            <tbody>
                              {Object.entries(employeeDetails.govProof).map(
                                (proof, idx) => (
                                  <tr className="" key={idx + 1}>
                                    {/* <td className="px-3 py-1">{idx + 1}</td> */}
                                    <td className="px-3 py-1 capitalize">
                                      {proof[0]}
                                    </td>
                                    <td className="px-3 py-1">{proof[1]}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                          {employeeDetails.paypal === "N/A" ? (
                            <div className="my-3 flex-1">
                              <p className="">Paypal</p>
                              <p className="">{employeeDetails.paypal}</p>
                            </div>
                          ) : null}
                          <div className="my-3 w-full">
                            <p className="text-xl">Bank Details </p>
                            <table className="whitespace-nowrap">
                              <tbody>
                                <tr>
                                  <td className="px-3 py-1 capitalize">
                                    Bank Name
                                  </td>
                                  <td className="px-3 py-1">
                                    {employeeDetails.bankName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-1 capitalize">
                                    IFSC Code
                                  </td>
                                  <td className="px-3 py-1">
                                    {employeeDetails.ifscCode}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="relative mx-5 ">
        {visible ? (
          <>
            <div className="absolute overflow-auto top-0 z-50 outline-none focus:outline-none w-full">
              <div className="relative w-auto overflow-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="overflow-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" overflow-auto flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-2xl">Add Employee</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none outline-none focus:outline-none font-weight-bold"
                      onClick={() => setVisible(false)}
                    >
                      x
                    </button>
                  </div>
                  {/*body*/}
                  <form className="" onSubmit={handleSubmit}>
                    <div className="mt-6 overflow-auto">
                      <div className="flex flex-col justify-center dark:bg-black  overflow-auto">
                        <div className="flex flex-wrap gap-x-10 justify-start my-1 mx-10 overflow-auto">
                          <div className="my-3 ">
                            <div className="text-black font-normal ">Name</div>
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
                              Mobile
                            </div>
                            <input
                              type="number"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter mobile"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">Email</div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Qualification
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter qualification"
                              value={qualification}
                              onChange={(e) => setQualification(e.target.value)}
                            />
                          </div>

                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Expertize
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter expertize"
                              value={expertize}
                              onChange={(e) => setExpertize(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Experience
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter experience"
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Salary
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter salary"
                              value={salary}
                              onChange={(e) => setSalary(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Current Address
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              placeholder="Enter current address"
                              value={currentAddress}
                              onChange={(e) =>
                                setCurrentAddress(e.target.value)
                              }
                            />
                          </div>

                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Joining Date
                            </div>
                            <input
                              type="text"
                              className="w-48 h-9 ps-1 bg-white rounded border border-black"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                          <div className="my-3 ">
                            <div className="text-black font-normal ">
                              Profile
                            </div>
                            <input
                              type="file"
                              className="w-48 h-9 ps-1 bg-white rounded border-black"
                              // value={profile}
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                          </div>
                        </div>

                        <div className="mx-10">
                          <p className="text-2xl">Governtment Proof</p>
                          <div className="flex gap-x-10 flex-wrap">
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Government Id Name
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Proof name"
                                value={governmentIdName}
                                onChange={(e) =>
                                  setGovernmentIdName(e.target.value)
                                }
                              />
                            </div>
                            <div className="my-3 flex-1">
                              <div className="text-black font-normal ">
                                Government Id Number
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                placeholder="Proof number"
                                value={governmentIdNumber}
                                onChange={(e) =>
                                  setGovernmentIdNumber(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mx-10">
                          <p className="text-2xl">Payment Details</p>
                          <div className="flex gap-x-10 flex-wrap">
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Bank name
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                value={bankName}
                                placeholder="Enter Account number"
                                onChange={(e) => setBankName(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                IFSC Code
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                value={ifscCode}
                                placeholder="Enter Account number"
                                onChange={(e) => setIfscCode(e.target.value)}
                              />
                            </div>
                            <div className="my-3 ">
                              <div className="text-black font-normal ">
                                Paypal
                              </div>
                              <input
                                type="text"
                                className="w-48 h-9 ps-1 bg-white rounded border border-black"
                                value={paypal}
                                placeholder="Enter paypal id"
                                onChange={(e) => setPaypal(e.target.files[0])}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative p-6 flex-auto"></div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="myCustomBtn  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        // onClick={() => setVisible(false)}
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
      <header className="flex justify-between mx-10">
        <button
          className="myCustomBtn p-3 rounded-md"
          onClick={() => {
            navigate("allotWork");
          }}
        >
          Allot Work
        </button>
        <button
          className="myCustomBtn p-3 rounded-md"
          onClick={() => {
            setVisible(true);
          }}
        >
          Add Employee
        </button>
      </header>
      <main className="overflow-x-auto mx-7 mt-6 rounded-lg">
        <table className="text-md text-left bg-white w-1/2 mx-auto">
          <thead className="text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                Pic
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Expertize
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0 ? (
              employees.map((employee, idx) => (
                <tr className="bg-white border-b" key={idx}>
                  <td className="ps-3 py-4">
                    <div className="h-12 w-12 border-2 border-black overflow-hidden rounded-full">
                      <img src={employee.pic} alt="" />
                    </div>
                  </td>
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-break-spaces">
                    {employee.expertize}
                  </td>
                  <td className="px-6 py-4 whitespace-break-spaces">
                    {employee.salary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="myCustomBtn px-3 py-1 rounded"
                      onClick={() => {
                        setProfileVisible(true);
                        const employeeD = {
                          name: employee.name,
                          mobile: employee.mobile,
                          email: employee.email,
                          createdAt: employee.createdAt,
                          salary: employee.salary,
                          expertize: employee.expertize,
                          exp: employee.exp,
                          govProof: employee.govProof,
                          advanceSalary: employee.advanceSalary,
                          totalAmount: employee.totalAmount,
                          salaryStatus: employee.salaryStatus,
                          // pic: employee.pic,
                          qual: employee.qual,
                          address: employee.address,
                          paypal: employee.paypal,
                          bankName: employee.bankName,
                          ifscCode: employee.ifscCode,
                        };
                        setEmployeeDetails(employeeD);
                      }}
                    >
                      View Profile
                    </button>
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

export default Employee;
