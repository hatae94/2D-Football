import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import PropsTypes from "prop-types";

import Modal from "../Modal";

import { setGameOver } from "../../redux/slice/roomSlice";

export default function Timer({ seconds }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const isPaused = useSelector((state) => state.room.roomInfo.isPaused);
  const isGameOver = useSelector((state) => state.room.roomInfo.isGameOver);
  const [second, setSecond] = useState(seconds);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        if (!isPaused) {
          setSecond((second) => second - 1);
        }
      } else if (!second) {
        dispatch(setGameOver());
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [second, isPaused]);

  useEffect(() => {
    if (isGameOver) {
      setIsOpen(true);
    }
  });

  function handleBackOnClick() {
    window.location.reload();
  }

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        게임 종료
        <button type="button" onClick={handleBackOnClick}>돌아가기</button>
      </Modal>
      <TimerBox>Time : {second}</TimerBox>
    </>
  );
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
