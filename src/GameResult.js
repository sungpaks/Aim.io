import React from "react";

const resultStyle = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  fontSize: "2em",
  color: "blue",
};

function GameResult(props) {
  return (
    <div>
      <h1 style={resultStyle}>
        YOUR SCORE = {props.score}
      </h1>
    </div>
  );
}

export default GameResult;
