import React, { useContext, useEffect } from "react";
import "../assets/components/FileList.scss";
import { FileContext } from "../context/FileContext";
import { TabBarContext } from "../context/TabBarContext";
const FileList = () => {
  const { fileText, uploadFile, setFile, file, readFile, fileData } =
    useContext(FileContext);
  const { addTab, changeTab } = useContext(TabBarContext);
  useEffect(() => {
    file && readFile(file);
  }, [file]);
  const handleFile = (e) => {
    e.preventDefault();
    uploadFile();
  };
  const openFile = (id, filename, filetype) => {
    addTab(id, filename, filetype);
    changeTab(id,fileData);
  };
  return (
    <div className="file-list-container">
      <form onSubmit={handleFile}>
        <div className="input-field">
          <label htmlFor="file">File</label>
          <span>{file?.target.files[0].name || "File name..."}</span>
          <input
            type="file"
            id="file"
            name="file"
            accept=".c++, .js"
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
              <li
                key={f.id}
                onClick={() =>
                  openFile(f.id, f.data.filename, f.data.filetype)
                }
              >
                {f.data.filetype == "py" ? (
                  <i className="fa-brands fa-python"></i>
                ) : (
                  <i className="fa-brands fa-js"></i>
                )}
                {f.data.filename}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
