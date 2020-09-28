import React from "react";

export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}

//We know that this component takes in three attributes (name, spots, selected) and one action (setDay) as props, so we'll need to update our DayListItem component to reflect this after building our stories.