import React from "react";
import InvoiceContext from "./InvoiceContext";

function InvoiceContextProvider({ children }) {
  const [invoice, setInvoice] = React.useState({});
  return (
    <InvoiceContext.Provider value={{ invoice, setInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceContextProvider;
