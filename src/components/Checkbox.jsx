import React, { useState } from "react";
import "./checkbox.css";
const Checkbox = ({ innerText, isChecked, setIsChecked }) => {
  return (
    <label className="form-control text-md select-none cursor-pointer flex items-center gap-2">
      <input
        type="checkbox"
        name="checkbox"
        defaultChecked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      {innerText}
    </label>
  );
};

export default Checkbox;
