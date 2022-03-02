import Phaser from "phaser";
import Ground from "../classes/Ground";
import Ball from "../gameObject/Ball";
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
    const { canvas } = this.sys;

    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

    this.createVirtualController(this.centerX, this.centerY, canvas);

    this.ground = new Ground({ scene: this });

    this.player1 = new Player(this, this.centerX, this.centerY - 50, "player1");

    this.ball = new Ball(this, this.centerX, this.centerY - 0);

    this.createPlayer(this.player1);
  }

  createVirtualController(x, y, canvas) {
    this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: x + canvas.width / 4,
      y: y + canvas.height / 3,
      radius: 50,
      base: this.add.circle(0, 0, 70, 0x888888),
      thumb: this.add.circle(0, 0, 30, 0xcccccc),
    });

    this.add
      .circle(x - canvas.width / 4, y + canvas.height / 3, 30, 0x888888)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        const player = this.player1.body;
        const { direction } = this.player1.body;
        const ball = this.ball.body;

        switch (direction) {
          case "right":
            ball.x = player.x + player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(100, 0);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "rightDown":
            ball.x = player.x + player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(100, 100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "down":
            ball.x = player.x;
            ball.y = player.y + player.height * 2;

            ball.setVelocityY(100);
            setTimeout(() => {
              ball.setVelocityY(0);
              ball.stop();
            }, 1000);
            break;
          case "leftDown":
            ball.x = player.x - player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(-100, 100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "left":
            ball.x = player.x - player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(-100, 0);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "leftUp":
            ball.x = player.x - player.width * 2;
            ball.y = player.y - player.height * 1.5;

            ball.setVelocity(-100, -100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "up":
            ball.x = player.x;
            ball.y = player.y - player.height * 2;

            ball.setVelocityY(-100);
            setTimeout(() => {
              ball.setVelocityY(0);
              ball.stop();
            }, 1000);
            break;
          case "rightUp":
            ball.x = player.x + player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(100, -100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          default:
            ball.x = player.x;
            ball.y = player.y + player.height * 2;

            ball.setVelocityY(100);
            setTimeout(() => {
              ball.setVelocityY(0);
              ball.stop();
            }, 1000);
        }
      });
  }

  createPlayer(player) {
    this.physics.add.overlap(
      player.body,
      this.ball.body,
      this.handlePlayerDribbleBall,
      this.checkHasBall(player),
      this,
    );
  }

  handlePlayerDribbleBall(player, ball) {
    this.ball.move();

    player.hasBall = true;

    const { direction } = player;

    switch (direction) {
      case "right":
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "rightDown":
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "down":
        ball.x = player.x;
        ball.y = player.y + player.height * 1.7;
        break;
      case "leftDown":
        ball.x = player.x - player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "left":
        ball.x = player.x - player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "leftUp":
        ball.x = player.x - player.width * 1.2;
        ball.y = player.y;
        break;
      case "up":
        ball.x = player.x;
        ball.y = player.y - player.height * 1.7;
        break;
      case "rightUp":
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y;
        break;
      default:
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        this.ball.stop();
    }
  }

  checkHasBall(player) {
    return (ball) => {
      if (!player) {
        return false;
      }

      return player.canHaveBall(ball);
    };
  }

  update() {
    this.player1.handleMovement(this.joyStick.angle, this.joyStick.force);
  }
}
