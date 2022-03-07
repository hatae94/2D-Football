import Phaser from "phaser";

export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.body = scene.physics.add.sprite(x, y, "ballMoving");
    this.body.scale = 3;
    this.body.possession = "";

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
    console.log(this.body.y);
    if (goalpost.texture.key === "goalpostUp") {
      console.log("up");
      return distanceY > 0;
    }
    console.log("down", goalpost.y, distanceY);
    return distanceY < 0;
  }
}
