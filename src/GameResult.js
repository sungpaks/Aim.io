import React from "react"

function GameResult(props) {
	return (
		<div>
			<h1>
				YOURE SCORE = {props.score} !
			</h1>
		</div>
	);
}

export default GameResult