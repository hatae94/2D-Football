import Phaser from "phaser";
import { useEffect } from "react";
import config from "./phaser/config/config";

function App() {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy();
    };
  }, []);
  return <div id="container" />;
}

export default App;
