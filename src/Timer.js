import React, { useRef, useEffect, useState } from "react";

function useInterval(callback, delay) {
	const savedCallback = useRef();

	useEffect(()=> {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

function TimeCounter() {
	const [count, setCount] = useState(0);

	useInterval(()=>{
		setCount(count + 1);
	}, 1000)
	return (
		<div>
			{count}
		</div>
	);
}
export default TimeCounter;