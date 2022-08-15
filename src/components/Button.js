import React from "react";
import classNames from "classnames";
import "components/Button.scss";

function Button(props) {

  const {confirm, danger, onClick, disabled, children } = props;

  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });
   
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
}

export default Button;