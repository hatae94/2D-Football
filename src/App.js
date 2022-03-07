import { useState } from "react";
import { useSelector } from "react-redux";
import GameBox from "./components/Game";

function App() {
  const socore = useSelector((state) => state.gameResult.player1Score);
  const [test, setTest] = useState(false);

  console.log(socore);

  function handelTest() {
    setTest(true);
  }

  return (
    <>
      <button type="button" onClick={handelTest}>test</button>
      {test && <GameBox />}
    </>
  );
}

export default App;
