import Phaser from "phaser";

import { BALL_INFO } from "../../constants/game";

export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.body = scene.physics.add.sprite(x, y, "ballMoving");
    this.body.scale = BALL_INFO.BODY_SCALE;
    this.body.possession = "";

    scene.alignGrid.placeAt(BALL_INFO.POSITION.X, BALL_INFO.POSITION.Y, this.body);
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
