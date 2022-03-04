import Phaser from "phaser";
import { useEffect } from "react";

import config from "../../phaser/config/config";
import Timer from "../share/Timer";

export default function Game() {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy();
    };
  }, [config]);

  return (
    <>
      <div id="container" />
      <Timer seconds={120} />
    </>
  );
}
