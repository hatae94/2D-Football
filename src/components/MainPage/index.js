import { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import RoomPage from "../RoomPage";

import mainPagePlayerOpenEyes from "../../assets/main_page_player_open_eyes.png";
import mainPagePlayerCloseEyes from "../../assets/main_page_player_close_eyes.png";
import mainPageCrowd from "../../assets/main_page_crowd.png";

export default function MainPage() {
  const history = useHistory();

  function handleOnClickStart() {
    history.push("/room");
  }

  return (
    <MainPageWrapper>
      <img className="playerImg" src={mainPagePlayerOpenEyes} alt="main page player" />
      <div className="titleBox">
        2D Football
      </div>
      <button type="button" onClick={handleOnClickStart}>시작</button>
      <div className="crowdImgBox">
        <img className="crowdImg" src={mainPageCrowd} alt="main page crowd" />
        <img className="crowdImg" src={mainPageCrowd} alt="main page crowd" />
      </div>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #5a8f3c;

  .playerImg {
    width: 60%;
    margin-top: 5rem;
  }

  .titleBox {
    font-size: 3rem;
    font-weight: bold;
  }

  .crowdImgBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;
