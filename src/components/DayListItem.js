import React from "react";

function DayListItem(props) {
  const name = "Monday";
  const spots = 6;
  const selected = false;
  const day = "Tuesday";

  return(
    <li>
      <h2 onClick={()=>props.setDay(day)} selected={props.selected} className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} still remaining</h3>
    </li>
  );
}

export default DayListItem;