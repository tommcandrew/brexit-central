import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header-container">
      <span className="home-link" onClick={() => props.updateNextPage("home")}>
        <div className="flags-container">
          <span className="flags brit-flag">Bre</span>
          <span className="flags euro-flag">xit</span>
        </div>
        <span className="planner">Central</span>
      </span>
    </div>
  );
}
