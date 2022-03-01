import Phaser from "phaser";
import Ground from "../classes/Ground";
import Player from "../gameObject/Player";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {
    const url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js";
    this.load.plugin("rexvirtualjoystickplugin", url, true);
  }

  create() {
    this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 120,
      y: 480,
      radius: 100,
    });

    const { canvas } = this.sys;

    this.ground = new Ground({ scene: this });

    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

    this.player1 = new Player(this, this.centerX, this.centerY, "player1");

    this.player2 = new Player(
      this,
      this.centerX + 100,
      this.centerY + 100,
      "player2",
    );
  }

  update() {
    this.player1.handleMovement(this.joyStick.angle, this.joyStick.force);
    this.player2.handleMovement(this.joyStick.angle, this.joyStick.force);
  }
}
