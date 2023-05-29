import React, { useContext, useEffect } from "react";
import "../assets/components/FileList.scss";
import { FileContext } from "../context/FileContext";
import { TabBarContext } from "../context/TabBarContext";
import { CalculateContext } from "../context/CalculateContext";
const FileList = () => {
  const { fileText, uploadFile, setFile, file, readFile, fileData,deleteFile } =
    useContext(FileContext);
  const { addTab, changeTab } = useContext(TabBarContext);
  const { clearResult } = useContext(CalculateContext);
  useEffect(() => {
    file && readFile(file);
  }, [file]);
  const handleFile = (e) => {
    e.preventDefault();
    uploadFile();
  };
  const openFile = (id, filename, filetype) => {
    addTab(id, filename, filetype);
    changeTab(id, fileData);
    clearResult();
  };
  return (
    <div className="file-list-container">
      <form onSubmit={handleFile}>
        <div className="input-field">
          <label htmlFor="file">
            <i className="fa-solid fa-upload"></i>
          </label>
          <span>{file?.target.files[0].name || "File name..."}</span>
          <input
            type="file"
            id="file"
            name="file"
            accept=".cpp, .js"
            required
            onChange={(e) => setFile(e)}
          />
        </div>
        <button type="submit" disabled={!fileText}>
          Import
        </button>
      </form>
      <div className="file-list">
        <h1>File list</h1>
        <ul>
          {fileData?.map((f) => {
            return (
              <li key={f.id}>
                <div
                  className="file-name"
                  onClick={() =>
                    openFile(f.id, f.data.filename, f.data.filetype)
                  }
                >
                  {f.data.filetype == "js" ? (
                      <img src="/img/js.png" alt="" srcset="" />
                      ) : (
                      <img src="/img/c-.png" alt="" srcset="" />
                  )}
                  {f.data.filename}
                </div>
                <button type="button" onClick={()=>deleteFile(f.id)}><i className="fa-solid fa-trash"></i></button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
