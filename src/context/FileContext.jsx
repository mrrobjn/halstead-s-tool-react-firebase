import {
  addDoc,
  collection,
  onSnapshot,
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
      onSnapshot(fileRef, (querySnapshot) => {
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
      console.log("upload thanh cong");
    } catch (error) {
      console.error(error.message);
    }
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
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
