import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.speed = 100;

    this.texureName = texture;

    this.body = scene.physics.add.sprite(x, y, `${this.texureName}Stand`);

    scene.alignGrid.placeAtIndex(7, this.body);

    this.body.scale = 3;

    this.body.direction = "";
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
        this.body.anims.play(`${this.texureName}-right`, true);
        this.body.setVelocityY(0);
        this.body.setVelocityX(this.speed);
        break;
      case angle < -20 && angle > -70:
        this.body.direction = "rightUp";
        this.body.anims.play(`${this.texureName}-rightUp`, true);
        this.body.setVelocityY(-this.speed);
        this.body.setVelocityX(this.speed);
        break;
      case angle < -70 && angle > -110:
        this.body.direction = "up";
        this.body.anims.play(`${this.texureName}-up`, true);
        this.body.setVelocityX(0);
        this.body.setVelocityY(-this.speed);
        break;
      case angle > -160 && angle < -110:
        this.body.direction = "leftUp";
        this.body.anims.play(`${this.texureName}-leftUp`, true);
        this.body.setVelocityY(-this.speed);
        this.body.setVelocityX(-this.speed);
        break;
      case angle < -160 || angle > 160:
        this.body.direction = "left";
        this.body.anims.play(`${this.texureName}-left`, true);
        this.body.setVelocityY(0);
        this.body.setVelocityX(-this.speed);
        break;
      case angle < 160 && angle > 110:
        this.body.direction = "leftDown";
        this.body.anims.play(`${this.texureName}-leftDown`, true);
        this.body.setVelocityY(this.speed);
        this.body.setVelocityX(-this.speed);
        break;
      case angle > 70 && angle < 110:
        this.body.direction = "down";
        this.body.anims.play(`${this.texureName}-down`, true);
        this.body.setVelocityX(0);
        this.body.setVelocityY(this.speed);
        break;
      case angle < 70 && angle > 20:
        this.body.direction = "rightDown";
        this.body.anims.play(`${this.texureName}-rightDown`, true);
        this.body.setVelocityY(this.speed);
        this.body.setVelocityX(this.speed);
        break;
      default:
        this.body.direction = "stand";
        this.body.anims.play(`${this.texureName}-stand`, true);
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
        break;
    }
  }
}
