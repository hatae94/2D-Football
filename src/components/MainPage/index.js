import { useHistory } from "react-router-dom";

import styled from "styled-components";

import mainPagePlayerSprite from "../../assets/main_page.png";
import mainPageCrowd from "../../assets/main_page_crowd.png";

export default function MainPage() {
  const history = useHistory();

  function handleOnClickStart() {
    history.push("/room");
  }

  return (
    <MainPageWrapper>
      <div className="playerImg" style={{ background: `url(${mainPagePlayerSprite})` }} />
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
    width: 358px;
    height: 174px;
    margin-top: 5rem;
    animation: sprite 1.5s steps(2) infinite;
  }

  @keyframes sprite {
    from { background-position: 0px; }
    to { background-position: -716px; }
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
