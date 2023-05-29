import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const ReportContext = createContext();
export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    async function getReportData() {
      const reportRef = collection(db, "reports");
      const q = query(reportRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const report = querySnapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setReportData(report);
      });
    }
    getReportData();
  }, []);
  const saveReport = async (state) => {
    try {
      await addDoc(collection(db, "reports"), {
        distinctOperatorsWithoutQuote: state.distinctOperatorsWithoutQuote,
        totalOperatorsWithoutQuote: state.totalOperatorsWithoutQuote,
        stringGetter: state.stringGetter,
        distinctOperandsWithoutString: state.distinctOperandsWithoutString,
        totalOperandsWithoutString: state.totalOperandsWithoutString,
        filename: state.filename,
        timestamp: serverTimestamp(),
      });
      console.log("upload thanh cong");
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteReport = async (id) => {
    await deleteDoc(doc(db, "reports", id));
  };
  return (
    <ReportContext.Provider value={{ reportData, saveReport, deleteReport }}>
      {children}
    </ReportContext.Provider>
  );
};
