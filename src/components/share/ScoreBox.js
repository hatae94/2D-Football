import { useSelector } from "react-redux";

import styled from "styled-components";

export default function ScoreBox() {
  const userName = useSelector((state) => state.room.userInfo.name);
  const userScore = useSelector((state) => state.room.userInfo.score);
  const otherUserName = useSelector((state) => state.room.otherUserInfo.name);
  const otherUserScore = useSelector((state) => state.room.otherUserInfo.score);

  return (
    <ScoreBoxWrapper>
      <div className="userInfo">
        <div className="userName">{userName}</div>
        <div className="userScore">{userScore}</div>
      </div>
      <div className="otherUserInfo">
        <div className="otherUserScore">{otherUserScore}</div>
        <div className="otherUserName">{otherUserName}</div>
      </div>
    </ScoreBoxWrapper>
  );
}

const ScoreBoxWrapper = styled.div`
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translate(-50%);
  width: 60%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ffe500;
  opacity: 0.7;
  border-radius: 2rem;

  .userInfo {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-right: solid;
  }

  .userName {
    overflow: hidden;
    width: 70%;
    text-align: center;
  }

  .otherUserInfo {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .otherUserName {
    overflow: hidden;
    width: 70%;
    text-align: center;
  }
`;
