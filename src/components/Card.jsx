import React from "react";

export default function Card({ item, onClick, isFlipped }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flippedWrapper">
        <div className={`flippedCard ${isFlipped ? "active" : ""}`}>
          <div className="front"></div>
          <div className="back">{item}</div>
        </div>
      </div>
    </div>
  );
}
