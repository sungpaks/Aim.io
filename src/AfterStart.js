import React, {useState} from "react";
import Game from "./Game.js";

function AfterStart() {
	const [timesup, setTimesup] = useState(false);
	setTimeout(setTimesup, 3000);

	return (
		<div>
			<Game timesup={timesup}/>
		</div>
	);
}

export default AfterStart;