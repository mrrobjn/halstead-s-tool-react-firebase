import React from "react";
import "../assets/pages/ReportPage.scss";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
const ReportPage = () => {
  return (
    <>
      <Header />
      <div className="page-body">
        <SideBar />
        <div className="page-container">
          <div className="report-page-container"></div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
