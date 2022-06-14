import React from "react";

import "components/Button.scss";

function Button(props) {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  } 
  
  if (props.danger) {
    buttonClass += " button--danger";
 }
  return (
   <button 
      onClick={props.onClick}
      disabled={props.disabled}
      className={buttonClass}
   >
      {props.children}
   </button>);
}

export default Button;