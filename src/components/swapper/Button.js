import React from "react";
import "./swapper.scss";

const Button = ({ to, onClick }) => {

  return (
    <button className="btn" onClick={onClick}>
      {to === "right" ? "Move ⯮" : to === "left" ? "⯬ Move" : null}
    </button>
  );
};

export default Button;
