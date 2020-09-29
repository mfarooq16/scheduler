import React from "react";

import "components/DayListItem.scss";

const classNames = require("classnames");

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full ": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}

//We know that this component takes in three attributes (name, spots, selected) and one action (setDay) as props, so we'll need to update our DayListItem component to reflect this after building our stories.