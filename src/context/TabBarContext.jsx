import { createContext, useReducer, useState } from "react";
import { TabBarReducer } from "../reducer/TabBarReducer";
export const TabBarContext = createContext();
export const TabBarProvider = ({ children }) => {
  const initState = [];
  const [tab, setTab] = useReducer(TabBarReducer, initState);
  const [text, setText] = useState("");
  const addTab = (id, filename, filetype) => {
    setTab({
      type: "add",
      item: { id: id, filename: filename, filetype: filetype },
    });
  };
  const changeTab = (id, fileData) => {
    const currentFile = fileData?.find((f) => f.id === id);
    if (currentFile) {
      setText(currentFile.data.text);
    }
    setTab({ type: "change", id });
  };
  const deleteTab = (id) => {
    setTab({ type: "remove", id });
    setText("")
  };
  return (
    <TabBarContext.Provider
      value={{ tab, addTab, deleteTab, changeTab, text, setText }}
    >
      {children}
    </TabBarContext.Provider>
  );
};
