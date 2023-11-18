import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import InvoiceContext from "../context/InvoiceContext";
import deleteIcon from "../assets/icons/delete.png";
import Toast from "../components/Toast";
import axios from "axios";

import PreviewInvoice from "./PreviewInvoice";

const Invoice = () => {
  const date = new Date();
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [addedDate, setAddedDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState("");
  const [description, setDescription] = React.useState([""]);
  const [subDescription, setSubDescription] = React.useState([""]);
  const [serviceAmount, setServiceAmount] = React.useState([""]);
  const [serviceDuration, setServiceDuration] = useState("Monthly");
  const [quantity, setQuantity] = React.useState([""]);
  const [advanceAmount, setAdvanceAmount] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("Cash");
  const [onlinePaymentMethod, setOnlinePaymentMethod] = React.useState("");
  const [items, setItems] = React.useState([{}]);
  const [visible, setVisible] = React.useState(false); // For modal
  const { setInvoice, invoice } = useContext(InvoiceContext);
  const [toast, setToast] = React.useState(false);
  const [AddInvoiceToast, setAddInvoiceToast] = React.useState(false);
  const [invoiceNumber, setInvoiceNumber] = React.useState();

  const handleDateChange = (e) => {
    let enteredDate = e.target.value;

    enteredDate = enteredDate.replace(/\D/g, "");
    if (enteredDate.length > 2) {
      enteredDate = `${enteredDate.slice(0, 2)}-${enteredDate.slice(2)}`;
    }
    if (enteredDate.length > 5) {
      enteredDate = `${enteredDate.slice(0, 5)}-${enteredDate.slice(5, 9)}`;
    }
    if (e.target.name === "addedDate") {
      setAddedDate(enteredDate);
    } else {
      setDueDate(enteredDate);
    }
    validateDate(enteredDate);
  };

  // Function to validate the date
  const validateDate = (date) => {
    const pattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    return pattern.test(date);
  };

  const handleAddItem = () => {
    if(description.length >= 4){
      return;
    }
    setDescription([...description, ""]); // Add a new empty item to the list
    setSubDescription([...subDescription, ""]); // Add a new empty item to the list
    setServiceAmount([...serviceAmount, ""]); // Add a new empty item to the list
    setQuantity([...quantity, ""]); // Add a new empty item to the list
  };

  const handleItemChange = (index, newValue) => {
    const updatedItems = [...description];
    updatedItems[index] = newValue;
    setDescription(updatedItems);
  };
  const handleSubItemChange = (index, newValue) => {
    const updatedItems = [...subDescription];
    updatedItems[index] = newValue;
    setSubDescription(updatedItems);
  };
  const handleServiceAmountChange = (index, newValue) => {
    const updatedItems = [...serviceAmount];
    updatedItems[index] = newValue;
    setServiceAmount(updatedItems);
  };
  const handleQuantityChange = (index, newValue) => {
    const updatedItems = [...quantity];
    updatedItems[index] = newValue;
    setQuantity(updatedItems);
  };

  const handleRemoveSubItem = (index) => {
    if (
      description.length <= 1 ||
      subDescription.length <= 1 ||
      serviceAmount.length <= 1
    ) {
      return;
    }
    const updatedSubItems = [...subDescription];
    const updatedItems = [...description];
    const updatedServiceAmount = [...serviceAmount];
    const updatedQuantity = [...quantity];
    updatedItems.splice(index, 1);
    updatedSubItems.splice(index, 1);
    updatedServiceAmount.splice(index, 1);
    updatedQuantity.splice(index, 1);
    setDescription(updatedItems);
    setServiceAmount(updatedServiceAmount);
    setSubDescription(updatedSubItems);
    setQuantity(updatedQuantity);
  };
  const getInvoiceNumber = async () => {
    try {
      const res = await axios.get("/api/v1/users/invoiceLength");
      if (res.data.success) {
        setInvoiceNumber(`SP-${res.data.data}`);
        const updatedInvoice = await {
          ...invoice,
          invoiceNumber,
        };
        await setInvoice(updatedInvoice);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getClientDetails = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const res = await axios.get(
        `/api/v1/users/clients?clientDetails=${clientId}`
      );
      if (res.data.success) {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setMobile(res.data.data.mobile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !addedDate ||
        !dueDate ||
        !totalAmount ||
        !description ||
        !subDescription ||
        !quantity ||
        !serviceAmount ||
        !advanceAmount ||
        !paymentMethod ||
        !invoiceNumber ||
        !serviceDuration
      ) {
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 6000);
      }
      const serviceArrary = new Array(description.length);
      for (let i = 0; i < description.length; i++) {
        serviceArrary[i] = {
          description: description[i],
          subDescription: subDescription[i],
          quantity: quantity[i],
          serviceAmount: serviceAmount[i],
        };
      }
      const invoice = {
        name,
        email,
        mobile,
        addedDate,
        dueDate,
        totalAmount,
        advanceAmount,
        serviceArrary,
        paymentMethod,
        invoiceNumber,
        serviceDuration,
        onlinePaymentMethod,
      };
      setInvoice(invoice);
      const res = await axios.post("/api/v1/users/addInvoice", invoice);
      if (res.data.success) {
        setAddInvoiceToast(true);
        setName("");
        setEmail("");
        setMobile("");
        setAddedDate("");
        setDueDate("");
        setTotalAmount("");
        setDescription([""]);
        setSubDescription([""]);
        setServiceAmount([""]);
        setServiceDuration("Monthly");
        setQuantity([""]);
        setAdvanceAmount("");
        setPaymentMethod("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const today = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    setAddedDate(today);
  }, []);

  
  //try
  useEffect(() => {
    setItems({
      ...items,
      description: description,
      subDescription: subDescription,
    });
  }, [description, subDescription]);
  useEffect(() => {
    setToast(false);
  }, [
    name,
    email,
    mobile,
    addedDate,
    dueDate,
    totalAmount,
    description,
    subDescription,
    serviceAmount,
    advanceAmount,
    paymentMethod,
  ]);

  return (
    <>
      <header className="flex justify-end mx-10 mt-12">
        <form onSubmit={getClientDetails}>
          <div className="my-3 flex items-center">
            <input
              type="text"
              className="w-48 h-9 ps-1 bg-white rounded border border-black mx-3"
              placeholder="Enter Client Id"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
            <button
              type="submit"
              className="myCustomBtn px-3 py-1 rounded-md "
              disabled={!clientId}
            >
              Search Client
            </button>
          </div>
        </form>
      </header>
      <div className="mx-6 bg-white h-auto rounded-lg no-scrollbar w-auto relative">
        {toast ? (
          <Toast
            message="Please fill all the fields"
            type="error"
            onClose={() => setToast(false)}
          />
        ) : null}
        {AddInvoiceToast ? (
          <Toast
            message="Invoice added successfully"
            type="success"
            onClose={() => setToast(false)}
          />
        ) : null}
        <header className="py-3 bg-yellow-400 rounded-t-lg ps-6 text-3xl">
          Add Invoice
        </header>
        {visible ? (
          <>
            <div className="absolute w-full -top-20">
              <div className="bg-black opacity-60 w-full h-full absolute"></div>
              <header className="flex justify-end mx-10 mt-10 relative">
                <button
                  className="myCustomBtn p-3 rounded-md"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  X
                </button>
              </header>
              <PreviewInvoice />
            </div>
          </>
        ) : null}
        {/* <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"></hr> */}
        <main className="mt-6">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center dark:bg-black  ">
              <div className="flex flex-wrap gap-x-16 mx-10 my-1 justify-start">
                <div className="my-3 justify-center ">
                  <div className="text-black font-normal ">Client name</div>
                  <input
                    type="text"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed"
                    placeholder="Enter name"
                    value={name}
                    disabled
                  />
                </div>
                <div className="my-3">
                  <div className="text-black font-normal  ">Client email</div>
                  <input
                    type="email"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed"
                    placeholder="Enter email"
                    value={email}
                    disabled
                  />
                </div>
                <div className="my-3">
                  <div className="text-black font-normal  ">Client mobile</div>
                  <input
                    type="number"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed"
                    placeholder="Enter mobile"
                    value={mobile}
                    disabled
                  />
                </div>
                <div className="my-3">
                  <div className="text-black font-normal  ">Today's date</div>
                  <input
                    type="text"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black"
                    placeholder="DD-MM-YYYY"
                    value={addedDate}
                    name="addedDate"
                    onChange={handleDateChange}
                  />
                </div>
                <div className="my-3">
                  <div className="text-black font-normal  ">Due date</div>
                  <input
                    type="text"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black"
                    placeholder="DD-MM-YYYY"
                    value={dueDate}
                    onChange={handleDateChange}
                  />
                </div>

                <div className="my-3 ">
                  <div className="text-black font-normal ">Payment method </div>
                  <select
                    className="w-48 h-9 ps-1 bg-white rounded border border-black"
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      e.target.value === "Cash"
                        ? setOnlinePaymentMethod("")
                        : setOnlinePaymentMethod("Gpay");
                    }}
                  >
                    <option value={"Cash"}>Cash</option>
                    <option value={"Online"}>Online</option>
                  </select>
                </div>
                {paymentMethod === "Online" && (
                  <div className="my-3 ">
                    <div className="text-black font-normal ">
                      Online Payment Method
                    </div>
                    <select
                      className="w-48 h-9 ps-1 bg-white rounded border border-black"
                      value={onlinePaymentMethod}
                      onChange={(e) => {
                        setOnlinePaymentMethod(e.target.value);
                      }}
                    >
                      <option value={"Gpay"}>Gpay</option>
                      <option value={"PhonePe"}>PhonePe</option>
                      <option value={"Paytm"}>Paytm</option>
                      <option value={"Bank Transfer"}>Bank Transfer</option>
                    </select>
                  </div>
                )}
                <div className="my-3 ">
                  <div className="text-black font-normal ">
                    Service Duration
                  </div>
                  <select
                    className="w-48 h-9 ps-1 bg-white rounded border border-black"
                    onChange={(e) => {
                      setServiceDuration(e.target.value);
                    }}
                  >
                    <option value={"Monthly"}>Monthly</option>
                    <option value={"Yearly"}>Yearly</option>
                    <option value={"One Time"}>One Time</option>
                  </select>
                </div>
                <div className="flex flex-col w-min md:w-full my-10">
                  <p className="text-2xl">Service Details</p>
                  <div className="flex flex-wrap gap-x-10 items-end ">
                    <div className="my-3">
                      <div className="text-black font-normal  ">
                        Description
                      </div>
                      {description.map((item, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            value={item}
                            className="w-48 h-9 ps-1 my-3 bg-white rounded border border-black"
                            placeholder="Enter description"
                            onChange={(e) =>
                              handleItemChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="my-3">
                      <div className="text-black font-normal  ">
                        Sub description
                      </div>
                      {subDescription.map((item, index) => (
                        <div key={index} className="flex flex-wrap">
                          <input
                            type="text"
                            value={item}
                            className="w-48 h-9 ps-1 my-3 bg-white rounded border border-black"
                            placeholder="Enter description"
                            onChange={(e) =>
                              handleSubItemChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="my-3">
                      <div className="text-black font-normal  ">Quantity</div>
                      {quantity.map((item, index) => (
                        <div key={index}>
                          <input
                            type="number"
                            value={item}
                            className="w-48 h-9 ps-1 my-3 bg-white rounded border border-black"
                            placeholder="Enter quantity"
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="my-3">
                      <div className="text-black font-normal  ">Amount</div>
                      {serviceAmount.map((item, index) => (
                        <div key={index}>
                          <input
                            type="number"
                            value={item}
                            className="w-48 h-9 ps-1 my-3 bg-white rounded border border-black"
                            placeholder="Enter amount"
                            onChange={(e) =>
                              handleServiceAmountChange(index, e.target.value)
                            }
                          />
                          <button
                            className="bg-red-500 px-2 py-2 ms-3 rounded-full  cursor-pointer text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveSubItem(index);
                            }}
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete"
                              className="w-4 h-4 invert"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <input
                      type="button"
                      className="bg-yellow-400 px-3 py-1  rounded border-black cursor-pointer"
                      value="Add Service"
                      onClick={() => {
                        handleAddItem();
                      }}
                    />
                  </div>
                </div>

                <div className="my-3">
                  <div className="text-black font-normal  ">Advance amount</div>
                  <input
                    type="number"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black"
                    placeholder="Enter advance amount"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                  />
                </div>

                <div className="my-3">
                  <div className="text-black font-normal">Total Amount</div>
                  <input
                    type="number"
                    className="w-48 h-9 ps-1 bg-white rounded border border-black cursor-not-allowed"
                    placeholder="Enter amount"
                    value={totalAmount}
                    disabled
                    // onChange={(e) => setTotalAmount(e.target.value)}
                  />
                  <input
                    type="button"
                    className="myCustomBtn px-3 py-1 ms-3 rounded cursor-pointer"
                    value={"Generate Total"}
                    disabled={
                      !name ||
                      !email ||
                      !mobile ||
                      !addedDate ||
                      !dueDate ||
                      !description ||
                      !subDescription ||
                      !quantity ||
                      !serviceAmount ||
                      !advanceAmount
                    }
                    onClick={() => {
                      let total = 0;
                      serviceAmount.forEach((item) => {
                        total += parseInt(item);
                      });
                      const totalAmt = total - advanceAmount;
                      setTotalAmount(totalAmt);
                      getInvoiceNumber();
                    }}
                  />
                </div>
              </div>
              <div className="my-3 flex justify-end me-6">
                {toast ? (
                  <p className="text-red-500">Please fill all fields</p>
                ) : null}
                <button
                  type="submit"
                  className="myCustomBtn font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                  disabled={
                    !name ||
                    !email ||
                    !mobile ||
                    !totalAmount ||
                    !addedDate ||
                    !dueDate ||
                    !description ||
                    !subDescription ||
                    !serviceAmount ||
                    !advanceAmount ||
                    !paymentMethod
                  }
                >
                  Add Invoice
                </button>
              </div>
            </div>
          </form>
        </main>
        <footer>
          <button
            className="myCustomBtn px-3 py-1 rounded cursor-pointer m-3 float-right  "
            onClick={() => {
              setVisible(true);
              const invoice = {
                name,
                email,
                mobile,
                addedDate,
                dueDate,
                totalAmount,
                description,
                subDescription,
                serviceAmount,
                advanceAmount,
                paymentMethod,
                invoiceNumber,
              };
              setInvoice(invoice);
            }}
            disabled={
              !name ||
              !email ||
              !mobile ||
              !addedDate ||
              !dueDate ||
              !totalAmount ||
              !description ||
              !subDescription ||
              !serviceAmount ||
              !advanceAmount ||
              !paymentMethod
            }
          >
            Preview & Download
          </button>
        </footer>
      </div>
    </>
  );
};

export default Invoice;
