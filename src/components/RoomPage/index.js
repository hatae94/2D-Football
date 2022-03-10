import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import Modal from "../Modal";
import Loader from "../Loader";

import {
  setIsReady, setName, setUserState, checkIsAllReady, makeRoom,
} from "../../redux/slice/roomSlice";

export default function RoomPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isReady = useSelector((state) => state.room.userInfo.isReady);
  const name = useSelector((state) => state.room.userInfo.name);
  const isAllReady = useSelector((state) => state.room.roomInfo.isAllReady);

  const [readyText, setReadyText] = useState("준비");
  const [showLoader, setShowLoader] = useState(false);
  const [ready, setReady] = useState(false);
  const [match, setMatch] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const userName = useRef("");

  useEffect(() => {
    if (isAllReady) {
      setShowLoader(false);
      history.push("/room/game");
    }
  }, [isAllReady]);

  function handleMatchClick() {
    dispatch(makeRoom());
    dispatch(setUserState({ name, isReady }));
    dispatch(checkIsAllReady());

    setReady(true);

    if (!isAllReady) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }

  function handleReadyClick() {
    if (userName.current) {
      dispatch(setName({ name: userName.current }));
    }

    if (name) {
      userName.current = name;
    }

    if (!userName.current) {
      setIsOpen(true);
      return;
    }

    dispatch(setIsReady());

    if (readyText === "준비") {
      setReadyText("준비 완료");
      setMatch(false);
    } else {
      setReadyText("준비");
      setMatch(true);
    }
  }

  function handleOnChange(event) {
    event.preventDefault();

    const { value } = event.target;

    userName.current = value;
  }

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        유저 이름을 입력해주세요!
      </Modal>
      <RoomPageWrapper>
        {showLoader && <Loader />}
        {name && <div className="nameBox">{`안녕하세요,\n${name}님!`}</div>}
        {!name &&
        <input type="text" placeholder="Username" onChange={handleOnChange} />}
        <button type="button" disabled={ready} onClick={handleReadyClick}>{readyText}</button>
        <button type="button" disabled={match} onClick={handleMatchClick}>매칭 시작</button>
      </RoomPageWrapper>
    </>
  );
}

const RoomPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5a8f3c;

  .nameBox {
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 3rem;
    width: 15rem;
    height: 5rem;
    text-align: center;
    white-space: pre-wrap;
  }
`;
