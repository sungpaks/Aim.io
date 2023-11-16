import React, { useRef, useEffect, useState } from "react";
import GameResult from "./GameResult.js"
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
	const headDist = Math.sqrt((targetPositionX-x) ** 2 + (targetPositionY-headRadius-bodyY/2-y) ** 2);
	if (headDist <= headRadius) {
		return 2;
	} else if (Math.abs(targetPositionX-x) <= bodyX/2 && Math.abs(targetPositionY-y) <= bodyY/2) {
		return 1;
	} else {
		return 0;
	}
}
function drawBody(ctx, x, y) {
	ctx.beginPath();
	const roundness = 5;
	ctx.moveTo(x, y - bodyY/2);
	ctx.arcTo(x + bodyX/2, y - bodyY/2, x + bodyX/2, y + bodyY/2, roundness);
	ctx.lineTo(x + bodyX/2, y + bodyY/2);
	ctx.lineTo(x - bodyX/2, y + bodyY/2);
	ctx.arcTo(x - bodyX/2, y - bodyY/2, x, y - bodyY/2, roundness);
	ctx.closePath();
}
function drawEyes(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x-2, y - bodyY/2 - headRadius);
	ctx.lineTo(x-5, y - bodyY/2 - headRadius - 3);
	ctx.moveTo(x+2, y - bodyY/2 - headRadius);
	ctx.lineTo(x+5, y - bodyY/2 - headRadius - 3);
	ctx.strokeStyle = "black";
	ctx.stroke();
}
function drawCross(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x+3, y);
	ctx.lineTo(x+10, y);
	ctx.moveTo(x-3, y);
	ctx.lineTo(x-10, y);
	ctx.moveTo(x, y+3);
	ctx.lineTo(x, y+10);
	ctx.moveTo(x, y-3);
	ctx.lineTo(x, y-10);
	ctx.strokeStyle = "black";
	ctx.stroke();
}


function Game(props) {
	const targetList = [
		{id : 1, x : newPosition(), y: newPosition()},
		{id : 2, x : newPosition(), y: newPosition()},
		{id : 3, x : newPosition(), y: newPosition()},
		{id : 4, x : newPosition(), y: newPosition()},
		{id : 5, x : newPosition(), y: newPosition()},
	]
	//const [[targetPositionX, targetPositionY], setTargetPosition] = useState(newPosition());
	const canvasRef = useRef(null);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);
	useEffect(() => {
		setInterval(() => setTime(time + 100), 100);
	}, [time]);

	const onClick = (e) => {
		targetList.map((target) => {
			setScore(score + isInTarget(e.nativeEvent.offsetX, e.nativeEvent.offsetY, target.x, target.y))
			target.x = newPosition();
			target.y = newPosition();
		});
	};

	useEffect(() => {
		setVoiceRecogition();
	}, []);

	useEffect(() => {
		targetList.map((target) => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//outer circle
			drawBody(ctx, target.x, target.y);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.stroke();
			//inner circle
			ctx.beginPath();
			ctx.arc(target.x, target.y - bodyY/2 - headRadius, headRadius, 0, 2 * Math.PI);
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.stroke();
			drawEyes(ctx, target.x, target.y);
			drawCross(ctx, mouseX, mouseY);
		});
	} , [score, redrawId, mouseX, mouseY]);
	if (props.timesup === false) return (
		<div>
			<h2 style={{ fontFamily: "Roboto, sans-serif", color : "gray"}}>
				Click The Target : score 1 per Body, score 2 per Head
			</h2>
			<canvas ref={canvasRef} 
				style = {{
					border: "1px solid black",
					backgroundColor: "lightblue"
				}}
				width="1000" height="500" 
				onClick={onClick} 
				onMouseMove={e => {
					setMouseX(e.nativeEvent.offsetX);
					setMouseY(e.nativeEvent.offsetY);
				}}
			/>
			<h3>Youre Current Score: {score}</h3>
			<TimeCounter />
		</div>
	);
	else return (
		<div>
			<GameResult score={score}/>
		</div>
	);
}

export default Game;