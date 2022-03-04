import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import PropsTypes from "prop-types";

export default function Timer({ seconds }) {
  const isPaused = useSelector((state) => state.gameResult.isPaused);
  const [second, setSecond] = useState(seconds);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        if (!isPaused) {
          setSecond((second) => second - 1);
        }
      } else if (!second) {
        // Modal
        console.log("over");
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [second, isPaused]);

  return <TimerBox>Time : {second}</TimerBox>;
}

const TimerBox = styled.div`
  position: absolute;
  margin-left: 1rem;
  margin-top: 1rem;
  font-weight: bold;
`;

Timer.defaultProps = {
  seconds: 120,
};

Timer.propTypes = {
  seconds: PropsTypes.number,
};
