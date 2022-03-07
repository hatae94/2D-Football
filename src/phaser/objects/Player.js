import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.speed = 100;

    this.textureName = texture;

    this.body = scene.physics.add.sprite(x, y, `${this.textureName}Stand`);

    if (this.textureName === "player1") {
      this.body.gridPosition = 12;
      scene.alignGrid.placeAtIndex(this.body.gridPosition, this.body);
    } else {
      this.body.gridPosition = 7;
      scene.alignGrid.placeAtIndex(this.body.gridPosition, this.body);
    }

    this.body.scale = 3;

    this.body.direction = "";

    this.body.anims.play(`${this.textureName}-stand`, true);
  }

  canHaveBall(ball) {
    const playerPosition = this.body.body.position;
    const ballPostion = ball.body.position;

    return Phaser.Math.Distance.BetweenPoints(playerPosition, ballPostion) < 25;
  }

  handleMovement(angle, force) {
    switch (true) {
      case force && angle > -20 && angle < 20:
        this.body.direction = "right";
        this.body.anims.play(`${this.textureName}-right`, true);
        this.body.setVelocityY(0);
        this.body.setVelocityX(this.speed);
        break;
      case angle < -20 && angle > -70:
        this.body.direction = "rightUp";
        this.body.anims.play(`${this.textureName}-rightUp`, true);
        this.body.setVelocityY(-this.speed);
        this.body.setVelocityX(this.speed);
        break;
      case angle < -70 && angle > -110:
        this.body.direction = "up";
        this.body.anims.play(`${this.textureName}-up`, true);
        this.body.setVelocityX(0);
        this.body.setVelocityY(-this.speed);
        break;
      case angle > -160 && angle < -110:
        this.body.direction = "leftUp";
        this.body.anims.play(`${this.textureName}-leftUp`, true);
        this.body.setVelocityY(-this.speed);
        this.body.setVelocityX(-this.speed);
        break;
      case angle < -160 || angle > 160:
        this.body.direction = "left";
        this.body.anims.play(`${this.textureName}-left`, true);
        this.body.setVelocityY(0);
        this.body.setVelocityX(-this.speed);
        break;
      case angle < 160 && angle > 110:
        this.body.direction = "leftDown";
        this.body.anims.play(`${this.textureName}-leftDown`, true);
        this.body.setVelocityY(this.speed);
        this.body.setVelocityX(-this.speed);
        break;
      case angle > 70 && angle < 110:
        this.body.direction = "down";
        this.body.anims.play(`${this.textureName}-down`, true);
        this.body.setVelocityX(0);
        this.body.setVelocityY(this.speed);
        break;
      case angle < 70 && angle > 20:
        this.body.direction = "rightDown";
        this.body.anims.play(`${this.textureName}-rightDown`, true);
        this.body.setVelocityY(this.speed);
        this.body.setVelocityX(this.speed);
        break;
      default:
        this.body.direction = "stand";
        this.body.anims.play(`${this.textureName}-stand`, true);
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
        break;
    }
  }
}