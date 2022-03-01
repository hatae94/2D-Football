import Phaser from "phaser";
import SceneMain from "../scenes/SceneMain";
import Preloader from "../scenes/PreloadScene";

let config = {};
let isMobile = window.navigator.userAgent.indexOf("Mobile");

if (isMobile === -1) {
  isMobile = window.navigator.userAgent.indexOf("Tablet");
}

if (isMobile === -1) {
  config = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    pixelArt: true,
    zoom: 2,
    backgroundColor: "#60E7F7",
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scene: [SceneMain],
  };
} else {
  config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    zoom: 1,
    backgroundColor: "#5a8f3c",
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene: [Preloader, SceneMain],
  };
}

export default config;
