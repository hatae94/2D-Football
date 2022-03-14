import Phaser from "phaser";

import SceneMain from "../scenes/SceneMain";
import Preloader from "../scenes/PreloadScene";

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  zoom: 1,
  parent: "container",
  backgroundColor: "#5a8f3c",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [Preloader, SceneMain],
};

export default config;
