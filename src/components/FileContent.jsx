import React, { useContext, useState } from "react";
import "../assets/components/FileContent.scss";
import { TabBarContext } from "../context/TabBarContext";
import { FileContext } from "../context/FileContext";
import ResultTable from "./ResultTable";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CalculateBtn from "./CalculateBtn";
import { CalculateContext } from "../context/CalculateContext";
const FileContent = () => {
  const { tab, changeTab, deleteTab, text } = useContext(TabBarContext);
  const { fileData } = useContext(FileContext);
  const { clearResult } = useContext(CalculateContext);
  const handleDeleteTab = (id) => {
    deleteTab(id);
    clearResult();
  };
  const handleChangeTab = (id) => {
    changeTab(id, fileData);
    clearResult();
  };
  const currentTab = tab?.find((t) => t.active === true);
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
                  {t.filetype == "js" ? (
                 <img src="/img/js.png" alt="" srcset="" />
                 ) : (
                 <img src="/img/c-.png" alt="" srcset="" />
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
          <CalculateBtn tab={tab} />
        </div>
      </div>
      <div className="content-container">
        <div
          className="text-container"
          style={{ background: text ? "#282c34" : "" }}
        >
          {tab.length !== 0 && text && (
            <SyntaxHighlighter
              language={currentTab?.filetype === "js" ? "javascript" : "cpp"}
              style={atomOneDark}
              customStyle={{ paddingTop: 20 }}
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
