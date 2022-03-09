import Phaser from "phaser";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import config from "../../phaser/config/config";

import Timer from "../share/Timer";

export default function Game() {
  const time = useSelector((state) => state.room.roomInfo.time);
  let game = {};

  // time 가져오기
  useEffect(() => {
    game = new Phaser.Game(config);

    return () => {
      game.destroy(true, true);
    };
  }, [config]);

  return (
    <>
      <div id="container" />
      <Timer seconds={time} />
    </>
  );
}
