import React, { useReducer } from "react";
import "../assets/pages/ReportPage.scss";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import ReportList from "../components/ReportList";
import ReportDetail from "../components/ReportDetail";
import { ReportInitalState, ReportReducer } from "../reducer/ReportReducer";
const ReportPage = () => {
  const [singleReport, setSingleReport] = useReducer(
    ReportReducer,
    ReportInitalState
  );
  const handleSetReport = (data,formattedDate) => {
    const {
      distinctOperatorsWithoutQuote,
      totalOperatorsWithoutQuote,
      stringGetter,
      distinctOperandsWithoutString,
      totalOperandsWithoutString,
      filename,
    } = data;
    setSingleReport({
      type: "set",
      payload: {
        distinctOperatorsWithoutQuote,
        totalOperatorsWithoutQuote,
        stringGetter,
        distinctOperandsWithoutString,
        totalOperandsWithoutString,
        filename,
        formattedDate,
      },
    });
  };
  return (
    <>
      <Header />
      <div className="page-body">
        <SideBar />
        <div className="page-container">
          <div className="report-page-container">
            <ReportList handleSetReport={handleSetReport} />
            <ReportDetail singleReport={singleReport} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
