import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

function DayListItem(props) {
  
  const day = props.name;
  

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = function(spots) {
    if (!spots) {
      return 'no spots remaining';
    }
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    if (spots === 2 || spots === 3 || spots === 4 || spots===5) {
      return `${spots} spots remaining`;
    }
  }

  return(
    <li className={dayClass}>
      <h2 onClick={()=>props.setDay(day)} selected={props.selected} className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

export default DayListItem;