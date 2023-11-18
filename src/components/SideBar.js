import React, { useContext, useState } from "react";
import dashboardIcon from "../assets/icons/dashboards.png";
import clientIcon from "../assets/icons/people.png";
import invoiceIcon from "../assets/icons/invoice.png";
import pendingIcon from "../assets/icons/file.png";
import investmentIcon from "../assets/icons/investment.svg";
import expenseIcon from "../assets/icons/file.png";
import salaryIcon from "../assets/icons/salary.png";
import reportsIcon from "../assets/icons/bar-chart.png";
import transactionIcon from "../assets/icons/transaction.png";
import arrowLeft from "../assets/icons/arrow-left.svg";
import logo from "../assets/logos/logo.png";
import imgLogo from "../assets/logos/imageLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../ComponentCss/SideBar.css";
import UserContext from "../context/UserContext";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  //eslint-disable-next-line
  const navItems = [
    { id: 1, icon: dashboardIcon, text: "Dashboard", to: "/dashboard" },
    { id: 2, icon: clientIcon, text: "Client", to: "/client" },
    { id: 3, icon: invoiceIcon, text: "Invoice", to: "/invoice" },
    { id: 4, icon: pendingIcon, text: "Pending", to: "/pending" },
    { id: 5, icon: investmentIcon, text: "Investment", to: "/investment" },
    { id: 6, icon: investmentIcon, text: "Income", to: "/income" },
    { id: 7, icon: expenseIcon, text: "Expense", to: "/expense" },
    { id: 8, icon: clientIcon, text: "Employee", to: "/employee" },
    { id: 9, icon: salaryIcon, text: "Salary", to: "/salary" },
    { id: 10, icon: reportsIcon, text: "Reports", to: "/reports" },
    {
      id: 11,
      icon: transactionIcon,
      text: "Transactions",
      to: "/transactions",
    },
    { id: 12, icon: arrowLeft, text: "Logout", to: "/logout" },
  ];

  const [activeItem, setActiveItem] = useState(1);

  const handleItemClick = (itemId, itemTo) => {
    if (activeItem === itemId) return;
    setActiveItem(itemId);
    navigate(itemTo);
  };
  React.useEffect(() => {
    const activeItem = navItems.find((item) => location.pathname === item.to);
    if (activeItem) {
      setActiveItem(activeItem.id);
    }
  }, [location.pathname, navItems]);

  return (
    <div className="sideBar w-20 md:w-64 sticky top-0 h-full">
      <div className="h-full">
        <div>
          <div className="text-3xl h-11 w-full flex justify-center">
            <img
              src={logo}
              className="object-contain hidden md:block"
              alt="spell growth"
            />
            <div className="block md:hidden">
              <img
                src={imgLogo}
                style={{
                  height: "50px",
                  width: "50px",
                }}
                alt="spell growth"
              />
            </div>
          </div>
          <div className="my-6">
            {navItems.map((item, idx) => (
              <div
                className={`menu_item flex justify-center md:justify-start items-center ${
                  activeItem === item.id ? "active" : ""
                }`}
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  handleItemClick(item.id, item.to);
                }}
              >
                <div className="flex md-block justify-center items-center">
                  <div
                    style={{
                      height: "1.75rem",
                      width: "1.75rem",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "contain",
                      }}
                      src={item.icon}
                      alt=""
                    />
                  </div>
                </div>
                <div className="menu_item_text text-center hidden md:block ms-6">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default SideBar;
