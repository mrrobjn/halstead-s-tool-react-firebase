import React, { useContext } from "react";
import "../assets/components/ReportList.scss";
import { ReportContext } from "../context/ReportContext";
const ReportList = ({handleSetReport}) => {
  const { reportData,deleteReport } = useContext(ReportContext);
  return (
    <div className="report-list-container">
      <div className="report-list">
        <ul>
          {reportData?.map((r) => {
            const date = r.data.timestamp.toDate()
            const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            return (
              <li key={r.id}>
                <div className="report-detail" onClick={()=>handleSetReport(r.data,formattedDate)}>
                  <div className="logo">
                    <i className="fa-solid fa-file-pdf fa-lg"></i>{" "}
                  </div>
                  <div className="report-info">
                    <p>{r.data.filename.split(".")[0]}.pdf</p>
                    <p>{formattedDate}</p>
                  </div>
                </div>
                <button type="button" onClick={()=>deleteReport(r.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReportList;
