import Phaser from "phaser";

import ButtonPlugin from "phaser3-rex-plugins/plugins/button-plugin.js";

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
  plugins: {
    global: [{
      key: "rexButton",
      plugin: ButtonPlugin,
      start: true,
    }],
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [Preloader, SceneMain],
};

export default config;
