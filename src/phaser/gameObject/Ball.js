import Phaser from "phaser";

export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.body = scene.physics.add.sprite(x, y, "ballMoving");
    this.body.scale = 3;
  }

  move() {
    this.body.anims.play("ball-moving", true);
  }

  stop() {
    this.body.anims.play("ball-moving", false);
  }
}
