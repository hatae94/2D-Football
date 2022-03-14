import Phaser from "phaser";

import { PLAYER_INFO, JOYSTICK } from "../../constants/game";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.speed = PLAYER_INFO.NORMAL_SPEED;

    this.textureName = texture;

    this.body = scene.physics.add.sprite(x, y, `${this.textureName}Stand`);

    if (this.textureName === "player1") {
      this.body.gridPosition = PLAYER_INFO.PLAYER1_GRID_POSITION;
      scene.alignGrid.placeAtIndex(this.body.gridPosition, this.body);
    } else {
      this.body.gridPosition = PLAYER_INFO.PLAYER2_GRID_POSITION;
      scene.alignGrid.placeAtIndex(this.body.gridPosition, this.body);
    }

    this.body.scale = PLAYER_INFO.BODY_SCALE;

    this.body.direction = "";

    this.body.anims.play(`${this.textureName}-stand`, true);
  }

  canHaveBall(ball) {
    const playerPosition = this.body.body.position;
    const ballPostion = ball.body.position;

    return Phaser.Math.Distance.BetweenPoints(playerPosition, ballPostion) < 25;
  }

  handleMovement(angle, force, button, scene) {
    const uniformVelocityX = this.speed * Math.cos((angle * Math.PI) / 180);
    const uniformVelocityY = this.speed * Math.sin((angle * Math.PI) / 180);

    switch (true) {
      case force && angle < JOYSTICK.RIGHT_RANGE.FROM && angle > JOYSTICK.RIGHT_RANGE.TO:
        this.body.direction = "right";
        this.body.anims.play(`${this.textureName}-right`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.RIGHT_UP_RANGE.FROM && angle > JOYSTICK.RIGHT_UP_RANGE.TO:
        this.body.direction = "rightUp";
        this.body.anims.play(`${this.textureName}-rightUp`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.UP_RANGE.FROM && angle > JOYSTICK.UP_RANGE.TO:
        this.body.direction = "up";
        this.body.anims.play(`${this.textureName}-up`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.LEFT_UP_RANGE.FROM && angle > JOYSTICK.LEFT_UP_RANGE.TO:
        this.body.direction = "leftUp";
        this.body.anims.play(`${this.textureName}-leftUp`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.LEFT_RANGE.FROM || angle > JOYSTICK.LEFT_RANGE.TO:
        this.body.direction = "left";
        this.body.anims.play(`${this.textureName}-left`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.LEFT_DOWN_RANGE.FROM && angle > JOYSTICK.LEFT_DOWN_RANGE.TO:
        this.body.direction = "leftDown";
        this.body.anims.play(`${this.textureName}-leftDown`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.DOWN_RANGE.FROM && angle > JOYSTICK.DOWN_RANGE.TO:
        this.body.direction = "down";
        this.body.anims.play(`${this.textureName}-down`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      case angle < JOYSTICK.RIGHT_DOWN_RANGE.FROM && angle > JOYSTICK.RIGHT_DOWN_RANGE.TO:
        this.body.direction = "rightDown";
        this.body.anims.play(`${this.textureName}-rightDown`, true);
        this.body.setVelocity(uniformVelocityX, uniformVelocityY);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
      default:
        this.body.direction = "stand";
        this.body.anims.play(`${this.textureName}-stand`, true);
        this.body.setVelocity(0, 0);
        // button.on("click", scene.handleButtonClick, scene);
        if (button.isDown) {
          console.log("fuck");
        }
        break;
    }
  }
}
