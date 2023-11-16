import StartButton from "./StartButton";
import React from 'react';

function BeforeStart ({ onStart }) {
	return (
		<div style={{ textAlign: 'center', padding: '20px' }}>
			<h1 align="center" style={{ fontFamily: 'Arial, sans-serif', fontSize: '2em', color: 'darkblue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>AIM.io</h1>
			<h2 align="center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.5em', color: 'darkgreen' }}>Wanna Get Started?</h2>
			<h3 align="center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em', color: 'darkred' }}>Press the button</h3>
			<StartButton onClick={onStart}/>
		</div>
	);
}

export default BeforeStart;