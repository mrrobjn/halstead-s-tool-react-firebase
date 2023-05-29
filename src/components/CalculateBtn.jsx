import React, { useContext, useState } from "react";
import { CalculateContext } from "../context/CalculateContext";
import { TabBarContext } from "../context/TabBarContext";
const CalculateBtn = ({tab}) => {
  const { fileCalculate } = useContext(CalculateContext);
  const [buttonState, setButtonState] = useState(false);
  const { text } = useContext(TabBarContext);
  const currentTab = tab?.find(t=>t.active===true)
  return (
    <button
      onMouseOver={() => setButtonState(true)}
      onMouseOut={() => setButtonState(false)}
      onClick={() => fileCalculate(text,currentTab?.filename)}
      style={{ width: buttonState ? 80 : 30 }}
    >
      <i
        className="fa-solid fa-play"
        style={{ marginRight: buttonState ? 10 : 0 }}
      ></i>
      {buttonState && "Run"}
    </button>
  );
};

export default CalculateBtn;
