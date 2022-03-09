import Phaser from "phaser";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import config from "../../phaser/config/config";

import Timer from "../share/Timer";
import ScoreBox from "../share/ScoreBox";

export default function Game() {
  const time = useSelector((state) => state.room.roomInfo.time);
  let game = {};

  useEffect(() => {
    game = new Phaser.Game(config);

    return () => {
      game.destroy(true, true);
    };
  }, [config]);

  return (
    <>
      <>
        <Timer seconds={time} />
        <ScoreBox />
      </>
      <div id="container" />
    </>
  );
}
