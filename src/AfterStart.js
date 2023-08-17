import React, {useState} from "react";
import Game from "./Game.js";

function AfterStart() {
	const [timesup, setTimesup] = useState(false);
	setTimeout(setTimesup, 30000);

	return (
		<div>
			<Game timesup={timesup}/>
		</div>
	);
}

export default AfterStart;