import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../ComponentCss/BoxTopBar.css";

const BoxTopBar = ({ heading, optionList }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="text-xl font-bold">{heading}</div>
        <div className="options">
          <div
            className="kabab_menu cursor-pointer relative"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            ...
          </div>
          <div className={`${visible ? "visble_option" : "hidden_option"} relative`}>
            <div className="absolute top-0 right-5 bg-slate-400 px-7  rounded-lg">
              {optionList.map((option, idx) => {
                return (
                  <div key={idx} className="m-3">
                    <Link href={option.link}>{option.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};

export default BoxTopBar;
