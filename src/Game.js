import React, { useRef, useEffect, useState } from "react";
import GameResult from "./GameResult.js";
import TimeCounter from "./Timer.js";
import "./Game.css";
import setVoiceRecogition from "./VoiceRec.js";

const bodyX = 30;
const bodyY = 50;
const headRadius = 10;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function newPosition() {
  return [getRandom(100, 900), getRandom(100, 400)];
}
function isInTarget(x, y, targetPositionX, targetPositionY) {
  const headDist = Math.sqrt(
    (targetPositionX - x) ** 2 +
      (targetPositionY - headRadius - bodyY / 2 - y) ** 2
  );
  if (headDist <= headRadius) {
    return 2;
  } else if (
    Math.abs(targetPositionX - x) <= bodyX / 2 &&
    Math.abs(targetPositionY - y) <= bodyY / 2
  ) {
    return 1;
  } else {
    return 0;
  }
}
function drawBody(ctx, x, y) {
  ctx.beginPath();
  const roundness = 5;
  ctx.moveTo(x, y - bodyY / 2);
  ctx.arcTo(
    x + bodyX / 2,
    y - bodyY / 2,
    x + bodyX / 2,
    y + bodyY / 2,
    roundness
  );
  ctx.lineTo(x + bodyX / 2, y + bodyY / 2);
  ctx.lineTo(x - bodyX / 2, y + bodyY / 2);
  ctx.arcTo(x - bodyX / 2, y - bodyY / 2, x, y - bodyY / 2, roundness);
  ctx.closePath();
}
function drawEyes(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x - 2, y - bodyY / 2 - headRadius);
  ctx.lineTo(x - 5, y - bodyY / 2 - headRadius - 3);
  ctx.moveTo(x + 2, y - bodyY / 2 - headRadius);
  ctx.lineTo(x + 5, y - bodyY / 2 - headRadius - 3);
  ctx.strokeStyle = "black";
  ctx.stroke();
}
function drawCross(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x + 3, y);
  ctx.lineTo(x + 10, y);
  ctx.moveTo(x - 3, y);
  ctx.lineTo(x - 10, y);
  ctx.moveTo(x, y + 3);
  ctx.lineTo(x, y + 10);
  ctx.moveTo(x, y - 3);
  ctx.lineTo(x, y - 10);
  ctx.strokeStyle = "black";
  ctx.stroke();
}

function Game(props) {
  const [targetList, setTargetList] = useState([
    { id: 1, x: 500, y: 250 },
    { id: 2, x: getRandom(100, 900), y: getRandom(100, 400) },
    { id: 3, x: getRandom(100, 900), y: getRandom(100, 400) },
    { id: 4, x: getRandom(100, 900), y: getRandom(100, 400) },
    { id: 5, x: getRandom(100, 900), y: getRandom(100, 400) },
  ]);
  //const [[targetPositionX, targetPositionY], setTargetPosition] = useState(newPosition());
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setTime((prevTime) => prevTime + 100),
      100
    );
    return () => clearInterval(interval); // clearInterval을 통해 타이머 제거
  }, []);

  const onClick = (e) => {
    for (let i = targetList.length - 1; i >= 0; i--) {
      const hit = isInTarget(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        targetList[i].x,
        targetList[i].y
      );
      if (hit > 0) {
        //const updatedTargetList = [...targetList];
        const [nx, ny] = newPosition();
        targetList[i].x = nx;
        targetList[i].y = ny;
        //updatedTargetList[i] = { ...updatedTargetList[i], x: nx, y: ny };

        setScore(score + hit);
        //setTargetList(updatedTargetList);
        console.log(targetList);
        break;
      }
    }
  };

  useEffect(() => {
    setVoiceRecogition();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCross(ctx, mouseX, mouseY);
    targetList.map((target) => {
      //outer circle
      drawBody(ctx, target.x, target.y);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      //inner circle
      ctx.beginPath();
      ctx.arc(
        target.x,
        target.y - bodyY / 2 - headRadius,
        headRadius,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();
      drawEyes(ctx, target.x, target.y);
    });
    console.log(1);
  }, [score, mouseX, mouseY]);

  if (props.timesup === false)
    return (
      <div>
        <h2 style={{ fontFamily: "Roboto, sans-serif", color: "gray" }}>
          Click The Target : score 1 per Body, score 2 per Head
        </h2>
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid black",
            backgroundColor: "lightblue",
          }}
          width="1000"
          height="500"
          onClick={onClick}
          onMouseMove={(e) => {
            setMouseX(e.nativeEvent.offsetX);
            setMouseY(e.nativeEvent.offsetY);
          }}
        />
        <h3>현재 점수 : {score}</h3>
      </div>
    );
  else
    return (
      <div>
        <GameResult score={score} />
      </div>
    );
}

export default Game;
