import React, { useState } from "react";
import Game from "./Game.js";
import styled from "styled-components";

// Styled component for the container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f0f0f0;
`;

function AfterStart() {
  const [timesup, setTimesup] = useState(false);

  // Simulate timesup after 30 seconds
  setTimeout(() => setTimesup(true), 30000);

  return (
    <Container>
      <h1 style={{ fontFamily: "Arial, sans-serif", fontSize: "2em", color: "blue" }}>
        AIM.io
      </h1>
      <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.5em", color: "green" }}>
        {timesup === true ? "Game's up" : "Game in progress..."}
      </p>
      <Game timesup={timesup} />
    </Container>
  );
}

export default AfterStart;
