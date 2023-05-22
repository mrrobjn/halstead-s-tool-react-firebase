import React, { useContext, useState } from "react";
import "../assets/components/FileContent.scss";
import { TabBarContext } from "../context/TabBarContext";
import { FileContext } from "../context/FileContext";
import ResultTable from "./ResultTable";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CalculateBtn from "./CalculateBtn";
const FileContent = () => {
  const { tab, changeTab, deleteTab, text } =
    useContext(TabBarContext);
  const { fileData } = useContext(FileContext);
  
  const handleDeleteTab = (id) => {
    deleteTab(id, fileData);
  };
  const handleChangeTab = (id) => {
    changeTab(id, fileData);
  };
  return (
    <div className="file-content-container">
      <div className="tab-bar">
        <div className="left-tab">
          {tab.map((t) => {
            return (
              <div
                className={t.active === true ? "tab active" : "tab"}
                act
                key={t.id}
              >
                <p onClick={() => handleChangeTab(t.id)}>
                  {t.filetype == "py" ? (
                    <i className="fa-brands fa-python"></i>
                  ) : (
                    <i className="fa-brands fa-js"></i>
                  )}
                  {t.filename}
                </p>
                <button onClick={() => handleDeleteTab(t.id)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            );
          })}
        </div>
        <div className="right-tab">
        <CalculateBtn/>
        </div>
      </div>
      <div className="content-container">
        <div
          className="text-container"
          style={{ background: text ? "#282c34" : "" }}
        >
          {tab.length !== 0 && text && (
            <SyntaxHighlighter
              language="javascript"
              style={atomOneDark}
              customStyle={{ paddingTop: 20}}
              showLineNumbers={true}
              >
              {text}
            </SyntaxHighlighter>
          )}
        </div>
        <ResultTable />
      </div>
    </div>
  );
};

export default FileContent;
