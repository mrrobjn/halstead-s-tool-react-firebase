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

export const FileContext = createContext();
export const FileProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);
  const [file, setFile] = useState();
  const [fileText, setFileText] = useState("");
  useEffect(() => {
    async function getFileData() {
      const fileRef = collection(db, "files");
      const q = query(fileRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const filess = querySnapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setFileData(filess);
      });
    }
    getFileData();
  }, []);
  const readFile = async () => {
    let fr = new FileReader();
    fr.readAsText(file.target.files[0]);
    fr.onload = async () => {
      const text = fr.result;
      setFileText(text);
    };
  };

  const uploadFile = async () => {
    try {
      await addDoc(collection(db, "files"), {
        text: fileText,
        filename: file.target.files[0].name,
        filetype: file.target.files[0].name.split(".").pop(),
        timestamp: serverTimestamp(),
      });
      console.log("Successfull import");
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteFile = async (id) => {
    await deleteDoc(doc(db, "files", id));
  };
  return (
    <FileContext.Provider
      value={{
        fileData,
        uploadFile,
        readFile,
        file,
        setFile,
        fileText,
        deleteFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
