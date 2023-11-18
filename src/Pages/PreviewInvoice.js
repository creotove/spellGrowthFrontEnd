import React, { useContext } from "react";
import logo from "../assets/logos/imageLogoWhiteVarient.png";
import { useReactToPrint } from "react-to-print";
import InvoiceContext from "../context/InvoiceContext";

const PrintableInvoice = React.forwardRef((props, ref) => {
  const { invoice } = useContext(InvoiceContext);
  console.log(invoice);

  const invoiceItems = {};
  for (let i = 0; i < invoice.description.length; i++) {
    invoiceItems[i] = {
      description: invoice.description[i],
      subdescription: invoice.subDescription[i],
      serviceAmount: invoice.serviceAmount[i],
    };
  }

  return (
    <div ref={ref} className="w-full">
      <main className="flex justify-center items-center">
        <div className="overflow-hidden">
          <div
            id="invoice"
            className="relative"
            style={{
              background: "#EEE",
              width: "210mm",
              height: "297mm",
            }}
          >
            <div
              className="bg-black absolute"
              style={{
                width: "210mm",
                height: "210mm",
                clipPath: "circle(51% at 50% 0%)",
              }}
            ></div>
            <div className="bg-yellow-400 w-full h-20 mt-10 absolute">
              <div className="flex justify-end me-14">
                <div className="w-max px-2 bg-black">
                  <img src={logo} alt="" className="h-20" />
                </div>
              </div>
            </div>
            {/* A4 Size */}
            <div className=" mx-12 relative h-full">
              <div
                className="w-full bg-white relative rounded-3xl shadow-sm"
                style={{
                  height: "75%",
                  top: "15%",
                }}
              >
                {/* Heading */}
                <p
                  className="text-center text-3xl font-semibold py-8"
                  style={{
                    letterSpacing: "10px",
                  }}
                >
                  INVOICE
                </p>
                {/* Invoice Details [invoice to , number etc.] */}
                <div className="flex mx-12 justify-evenly">
                  <div className="w-1/2">
                    <div
                      style={
                        {
                          // lineHeight: "1.8rem",
                        }
                      }
                    >
                      <p className="">Invoice to:</p>
                      <p className="font-semibold">{invoice.name}</p>
                      <p className="">{invoice.mobile}</p>
                      <p className="">{invoice.email}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-end">
                    <div
                      style={
                        {
                          // lineHeight: "1.8rem",
                        }
                      }
                    >
                      <p className="">Invoice No : {invoice.invoiceNumber}</p>
                      <p className=""> Invoice Date : {invoice.addedDate} </p>
                      <p className=""> Due Date : {invoice.dueDate}</p>
                    </div>
                  </div>
                </div>
                {/* Main Body */}
                <div
                  className="mt-6 mx-12 flex flex-col justify-between"
                  style={{
                    height: "70%",
                  }}
                >
                  {/* table for items */}
                  <table className="w-full">
                    <thead className="font-semibold bg-yellow-400 h-16 text-2xl">
                      <tr>
                        <th className="text-start ps-10 w-1/2">Description</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(invoiceItems).map((key, idx) => {
                        return (
                          <tr className="h-10 bg-slate-100 ">
                            <td className="text-start ps-10">
                              <div className="text-xl">
                                {invoiceItems[key].description}
                              </div>
                              <div className="text-sm">
                                {invoiceItems[key].subdescription}
                              </div>
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-right pe-3">
                              {invoiceItems[key].serviceAmount} INR
                            </td>
                          </tr>
                        );
                      })}

                      {/* <tr className="h-5 ">
                        <td className="text-center"></td>
                        <td className="text-right">Sub Total:</td>
                        <td className="text-right pe-3 text-red-500">{invoice.advanceAmount + invoice.totalAmount } INR</td>
                      </tr>  */}

                      <tr className="h-5 ">
                        <td className="text-center"></td>
                        <td className="text-right">Advance Amount:</td>
                        <td className="text-right pe-3 text-red-500">
                          - {invoice.advanceAmount ? invoice.advanceAmount : 0}{" "}
                          INR
                        </td>
                      </tr>

                      <tr className="h-16 ">
                        <td className="text-center"></td>
                        <td className="text-right">Total:</td>
                        <td className="text-right pe-3">
                          {invoice.totalAmount} INR
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Payment T&C*/}
                  <div className="flex flex-col justify-self-start">
                    <div className="my-10">
                      <p className="text-sm">A/c Number : 923010005581886</p>
                      <p className="text-sm">IFSC Code : UTIB0000728</p>
                      <p className="text-sm">Bank Name : Axis Bank</p>
                      <p className="text-sm">
                        Total Amount : {invoice.totalAmount} INR
                      </p>
                      <p className="text-sm">
                        <b>UPI</b> - spellgrowth@okaxis
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xl font-semibold mb-3">
                        Terms and Conditions
                      </p>
                      <p className="text-sm">
                        1. Payment is due within 5-7 days from the date of the
                        invoice.
                      </p>
                      <p className="text-sm">
                        2. Late payments may incur a penalty fee of 6% per month
                        on the outstanding balance.
                      </p>
                      <p className="text-sm">
                        3. Ownership of services transfers upon full payment of
                        the invoice. 1
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* footer */}
            </div>
            <div className="flex justify-center items-center font-semibold text-xl bg-yellow-400 h-16 absolute bottom-0 w-full">
              Thank you for your business!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

const PreviewInvoice = () => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-full overflow-x-auto">
      <div id="printable-content">
        <PrintableInvoice ref={componentRef} />
      </div>
      <div className="flex justify-center my-10">
        <button
          className="px-3 py-1 myCustomBtn text-center text-3xl rounded relative"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PreviewInvoice;
