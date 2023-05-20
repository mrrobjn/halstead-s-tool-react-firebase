import React from "react";
import "../assets/pages/HomePage.scss";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
const HomePage = () => {
  return (
    <>
      <Header />
      <div className="page-body">
        <SideBar />
        <div className="page-container">
          <div className="homepage-container">
            <div className="logo">
              <h1>
                {"<"} Halstead's Tool {">"}
              </h1>
            </div>
            <div className="author-name">
              <p>Vo Truong Dung</p>
              <p>Nguyen Trung Hieu</p>
              <p>Phan Nhat Hoang</p>
              <p>Than Thi Thao</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
