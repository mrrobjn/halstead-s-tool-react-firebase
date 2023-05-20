import React, { useContext, useState } from "react";
import "../assets/components/FileContent.scss";
import { TabBarContext } from "../context/TabBarContext";
import { FileContext } from "../context/FileContext";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const FileContent = () => {
  const { tab, changeTab, deleteTab, text, setText } =
    useContext(TabBarContext);
  const { fileData } = useContext(FileContext);
  const [buttonState, setButtonState] = useState(false);
  return (
    <div className="file-content-container">
      <div className="left-tab">
        <div className="tab-bar">
          {tab.map((t) => {
            return (
              <div
                className={t.active === true ? "tab active" : "tab"}
                act
                key={t.id}
              >
                <p onClick={() => changeTab(t.id, fileData)}>
                  {t.filetype == "py" ? (
                    <i className="fa-brands fa-python"></i>
                  ) : (
                    <i className="fa-brands fa-js"></i>
                  )}
                  {t.filename}
                </p>
                <button onClick={() => deleteTab(t.id, fileData)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            );
          })}
        </div>
        <div className="text-container">
          {tab.length !== 0 && text&& (
            // <SyntaxHighlighter
            //   language="python"
            //   style={atomOneDark}
            //   showLineNumbers={true}
            //   customStyle={{ padding: 10,overflowX:"auto"}}
            // >
            //   {text}
            // </SyntaxHighlighter>
            <textarea>{text}</textarea>
          )}
        </div>
      </div>
      <div className="right-tab">
        <div className="tab-bar">
          <button
            onMouseOver={() => setButtonState(true)}
            onMouseOut={() => setButtonState(false)}
            style={{ width: buttonState ? 70 : 30 }}
          >
            <i
              className="fa-solid fa-play"
              style={{ marginRight: buttonState ? 10 : 0 }}
            ></i>
            {buttonState && "Run"}
          </button>
        </div>
        <div className="result-container"></div>
      </div>
    </div>
  );
};

export default FileContent;
