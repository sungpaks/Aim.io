import React from "react";
import RestartButton from "./RestartButton";

const resultStyle = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  fontSize: "2em",
  color: "black",
};

const scoreStyle = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  fontSize: "2em",
  color: "crimson",
};

function GameResult({ score, onReplay }) {
  return (
    <div>
      <h2 style={resultStyle}>당신의 최종 점수: </h2>
      <h2 style={scoreStyle}>{score}</h2>
      <RestartButton onClick={onReplay}></RestartButton>
    </div>
  );
}

export default GameResult;
