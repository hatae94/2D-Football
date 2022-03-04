import Phaser from "phaser";

export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.body = scene.physics.add.sprite(x, y, "ballMoving");
    this.body.scale = 3;
    this.body.possession = false;

    scene.alignGrid.placeAt(2, 1.5, this.body);
  }

  move() {
    this.body.anims.play("ball-moving", true);
  }

  stop() {
    this.body.anims.play("ball-moving", false);
  }

  isInGoalpost(goalpost) {
    const distanceY = goalpost.y - this.body.y;

    if (goalpost.texture.key === "goalpostUp") {
      return distanceY > 0;
    }

    return distanceY < 0;
  }
}
