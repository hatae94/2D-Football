import Phaser from "phaser";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import config from "../../phaser/config/config";

import Timer from "../share/Timer";
import ScoreBox from "../share/ScoreBox";
import Modal from "../Modal";
import {
  resetObjects, setName, setToInitial,
} from "../../redux/slice/roomSlice";

export default function Game() {
  const dispatch = useDispatch();
  const history = useHistory();

  const time = useSelector((state) => state.room.roomInfo.time);
  const name = useSelector((state) => state.room.userInfo.name);
  const suddenDisconnectedMessage = useSelector((state) => state.room.roomInfo.suddenDisconnectedMessage);

  const userName = useRef("");

  useEffect(() => {
    const game = new Phaser.Game(config);
  }, [config]);

  function handleBackOnClick() {
    userName.current = name;

    dispatch(resetObjects());
    dispatch(setToInitial());
    dispatch(setName({ name: userName.current }));

    history.push("/");
  }

  return (
    <>
      <Modal open={suddenDisconnectedMessage} onClose={() => suddenDisconnectedMessage}>
        <MessageBox>{suddenDisconnectedMessage}</MessageBox>
        <button type="button" onClick={handleBackOnClick}>홈으로</button>
      </Modal>
      <>
        <Timer seconds={time} />
        <ScoreBox />
      </>
      <div id="container" />
    </>
  );
}

const MessageBox = styled.div`
  font-weight: bold;
  margin-top: 1.5rem;
`;
