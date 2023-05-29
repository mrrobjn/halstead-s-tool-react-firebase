import React from "react";
import "../assets/components/ReportDetail.scss";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReactPdf from "./ReactPdf";
const ReportDetail = ({ singleReport }) => {
  let dotIndex = singleReport?.filename.indexOf(".");
  return (
    <div className="report-detail-container">
      <div className="report-tab-bar">
        <div className="left-tab">
          {singleReport?.filename !== "" ? (
            <>
              <p>
                Opening: {singleReport.filename.slice(0,dotIndex)}.pdf
              </p>
              <p>Date modified: {singleReport.formattedDate}</p>
            </>
          ):""}
        </div>
        <div className="right-tab">
          <PDFDownloadLink document={<ReactPdf singleReport={singleReport}/>} fileName={singleReport.filename.slice(0,dotIndex)}>
            <i className="fa-solid fa-file-export"></i>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="report-page">
        <PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
          <ReactPdf singleReport={singleReport} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ReportDetail;
