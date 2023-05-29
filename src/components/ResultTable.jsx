import React, { useContext, useEffect } from "react";
import { CalculateContext } from "../context/CalculateContext";
import "../assets/components/ResultTable.scss";
import { ReportContext } from "../context/ReportContext";
const ResultTable = () => {
  const { state } = useContext(CalculateContext);
  const { saveReport } = useContext(ReportContext);
  return (
    <div className="result-container">
      {state?.distinctOperatorsWithoutQuote.length > 0 && (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Operators</th>
                  <th>Number of occurrences</th>
                </tr>
              </thead>
              <tbody>
                {state.distinctOperatorsWithoutQuote.map((t, i) => {
                  const singleOperatorLength =
                    state.totalOperatorsWithoutQuote.filter(
                      (o) => o === t
                    ).length;
                  return (
                    <tr key={i}>
                      <td>{t}</td>
                      <td>{singleOperatorLength}</td>
                    </tr>
                  );
                })}
                {state.stringGetter?.length > 0 ? (
                  <tr>
                    <td>"..."</td>
                    <td>{state.stringGetter.length}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Operands</th>
                  <th>Number of occurrences</th>
                </tr>
              </thead>
              <tbody>
                {state.stringGetter?.length > 0 ? (
                  <tr>
                    <td>string</td>
                    <td>{state.stringGetter.length}</td>
                  </tr>
                ) : (
                  ""
                )}
                {state.distinctOperandsWithoutString.map((o, i) => {
                  const singleOperandLength =
                    state.totalOperandsWithoutString.filter((a) => a === o);
                  return (
                    <tr key={i}>
                      <td>{o}</td>
                      <td>{singleOperandLength?.length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {state.distinctOperandsWithoutString.length > 0 && (
        <button
          type="button"
          className="report-save-btn"
          onClick={() => saveReport(state)}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default ResultTable;
