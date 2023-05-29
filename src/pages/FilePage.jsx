import React from "react";
import FileList from "../components/FileList";
import FileContent from "../components/FileContent";
import "../assets/pages/FilePage.scss";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
const FilePage = () => {
  return (
    <>
      <Header />
      <div className="page-body">
        <SideBar />
        <div className="page-container">
          <div className="file-page-container">        
            <FileList />
            <FileContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilePage;
