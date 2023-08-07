import BeforeStart from "./BeforeStart.js";
import AfterStart from "./AfterStart.js";
import React, { useState } from "react";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const onStartButtonClicked = () => {
    setIsStarted(true);
  };
  return (
    <div>
      {console.log(isStarted)}
      {isStarted === false ? <BeforeStart onStart={onStartButtonClicked}/> : <AfterStart />}
    </div>
  );
}

export default App;
