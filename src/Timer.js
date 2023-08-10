import React, { useRef, useEffect, useState } from "react";


const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [milliseconds, setMilliseconds] = useState(0);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setMilliseconds(parseInt(milliseconds) + 1);
			if (parseInt(milliseconds) === 99) {
				setSeconds(parseInt(seconds) + 1);
				setMilliseconds(0);
			}
		}, 10);
		return () => clearInterval(interval);
	}, [seconds, milliseconds]);

	return (
		<div>
			{seconds}:{milliseconds}
		</div>
	);
};

export default Timer;