import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import PropsTypes from "prop-types";

import Modal from "../Modal";

import {
  setGameOver, makeRoom, setToInitial, resetObjects, setName,
} from "../../redux/slice/roomSlice";

export default function Timer({ seconds }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const isPaused = useSelector((state) => state.room.roomInfo.isPaused);
  const isGameOver = useSelector((state) => state.room.roomInfo.isGameOver);
  const userScore = useSelector((state) => state.room.userInfo.score);
  const otherUserScore = useSelector((state) => state.room.otherUserInfo.score);
  const name = useSelector((state) => state.room.userInfo.name);

  const [second, setSecond] = useState(seconds);
  const [isOpen, setIsOpen] = useState(false);
  const userName = useRef("");

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
  }, [isGameOver]);

  function handleBackOnClick() {
    userName.current = name;

    dispatch(makeRoom());
    dispatch(resetObjects());
    dispatch(setToInitial());
    dispatch(dispatch(setName({ name: userName.current })));
    history.push("/");
  }

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GameOverTextBox>
          <div className="gameOverText">게임 종료</div>
          <div className="overStateText">
            <div>{`${userScore} : ${otherUserScore}`}</div>
            <div>
              {userScore > otherUserScore && "승리!"}
              {userScore < otherUserScore && "패배.."}
              {userScore === otherUserScore && "무승부"}
            </div>
          </div>
        </GameOverTextBox>
        <button type="button" onClick={handleBackOnClick}>돌아가기</button>
      </Modal>
      <TimerBox>Time : {`${Math.trunc(second / 60)}분 ${second % 60}초`}</TimerBox>
    </>
  );
}

const TimerBox = styled.div`
  position: absolute;
  margin-left: 1rem;
  margin-top: 1rem;
  font-weight: bold;
`;

const GameOverTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 40%;

  .gameOverText {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .overStateText {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
  }
`;

Timer.defaultProps = {
  seconds: 120,
};

Timer.propTypes = {
  seconds: PropsTypes.number,
};
