import { useSelector } from "react-redux";
import GameBox from "./components/Game";

function App() {
  const socore = useSelector((state) => state.gameResult.player1Score);
  console.log(socore);
  return <GameBox />;
}

export default App;
