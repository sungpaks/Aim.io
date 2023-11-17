import React, { useRef, useEffect, useState } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
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

  useInterval(() => {
    setCount(count + 1);
  }, 1000);
  return (
    <div style={{ color: "red" }}>
      <span>남은 시간 : </span>
      <span style={{ fontWeight: "bold" }}>{30 - count}초</span>
    </div>
  );
}
export default TimeCounter;
