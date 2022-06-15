import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

function DayListItem(props) {
  const name = "Monday";
  const spots = 6;
  const selected = false;
  const day = "Tuesday";
  

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return(
    <li className={dayClass}>
      <h2 onClick={()=>props.setDay(day)} selected={props.selected} className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} still remaining</h3>
    </li>
  );
}

export default DayListItem;