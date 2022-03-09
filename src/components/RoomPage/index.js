import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import Modal from "../Modal";
import Loader from "../Loader";

import {
  setIsReady, setName, setUserState, error, setError, checkIsAllReady, makeRoom,
} from "../../redux/slice/roomSlice";

export default function RoomPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isReady = useSelector((state) => state.room.userInfo.isReady);
  const name = useSelector((state) => state.room.userInfo.name);
  // const errorMessage = useSelector((state) => state.room.roomInfo.errorMessage);
  const isAllReady = useSelector((state) => state.room.roomInfo.isAllReady);

  const [readyText, setReadyText] = useState("준비");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isAllReady) {
      setShowLoader(false);
      history.push("/room/game");
    }
  }, [isAllReady]);

  function handleMatchClick() {
    dispatch(makeRoom());
    dispatch(setUserState({ name, isReady }));
    dispatch(error());
    dispatch(checkIsAllReady());

    if (!isAllReady) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }

  function handleReadyClick() {
    dispatch(setIsReady());

    if (readyText === "준비") {
      setReadyText("준비 완료");
    } else {
      setReadyText("준비");
    }
  }

  function handleOnChange(event) {
    event.preventDefault();

    const { value } = event.target;

    dispatch(setName({ name: value }));
  }

  function handleModalClose() {
    dispatch(setError({ error: "" }));
  }

  return (
    <RoomPageWrapper>
      {showLoader && <Loader />}
      <input type="text" placeholder="Username" onChange={handleOnChange} />
      <button type="button" onClick={handleReadyClick}>{readyText}</button>
      <button type="button" onClick={handleMatchClick}>매칭 시작</button>
    </RoomPageWrapper>
  );
}

const RoomPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5a8f3c;
`;
