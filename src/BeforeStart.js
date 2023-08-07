import StartButton from "./StartButton";
import React from 'react';

function BeforeStart ({ onStart }) {
	return (
		<div>
			<h1 align="center">AIM.io</h1>
			<h2 align="center">Wanna Get Started?</h2>
			<h3 align="center">press the button</h3>
			<StartButton onClick={onStart}/>
		</div>
	);
}

export default BeforeStart;