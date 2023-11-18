import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";

const DefaultLayout = () => {
  return (
    <>
      <ProtectedRoutes>
        <SideBar />
        <div className="flex-1  overflow-x-auto no-scrollbar">
          <Outlet /> {/* The content for each route will be displayed here */}
        </div>
      </ProtectedRoutes>
    </>
  );
};

export default DefaultLayout;
