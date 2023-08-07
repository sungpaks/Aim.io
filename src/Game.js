import React, { useRef, useEffect, useState } from "react";

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function newPosition() {
	return [getRandom(0, 1000), getRandom(0, 500)];
}
function isInTarget(x, y, targetPositionX, targetPositionY) {
	const dist = Math.sqrt((targetPositionX-x) ** 2 + (targetPositionY-y) ** 2);
	if (dist <= 10) {
		return 2;
	} else if (dist <= 30) {
		return 1;
	} else {
		return 0;
	}
}
function Game() {
	const [[targetPositionX, targetPositionY], setTargetPosition] = useState(newPosition());
	const canvasRef = useRef(null);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);

	const onClick = (e) => {
		setScore(isInTarget(e.offsetX, e.offsetY, targetPositionX, targetPositionY));
		setTargetPosition(newPosition());
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//outer circle
		ctx.beginPath();
		ctx.arc(targetPositionX, targetPositionY, 30, 0, 2 * Math.PI);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.stroke();
		//inner circle
		ctx.beginPath();
		ctx.arc(targetPositionX, targetPositionY, 10, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.stroke();
	} , [targetPositionX, targetPositionY]);

	return (
		<div>
			<h1>Aim.io</h1>
			<h2>Click the target!</h2>
			<canvas ref={canvasRef} width="1000" height="500" onClick={onClick} />
			<h3>Score: {score}</h3>
		</div>
	);
}

export default Game;