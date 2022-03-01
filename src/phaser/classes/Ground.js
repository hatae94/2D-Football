import Phaser from "phaser";
import Align from "./util/align";

export default class Ground extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);

    this.scene = config.scene;
    this.config = this.scene.sys.game.config;
    this.back = this.scene.add.image(0, 0, "ground");

    Align.center(this.config, this.back);

    this.add(this.back);
    this.addGoalpost();
    this.scene.add.existing(this);
  }

  addGoalpost() {
    const goalposts = [
      {
        key: "goalpostUp",
        x: this.back.x,
        y: this.back.y - this.back.height / 2,
        scale: 1,
      },
      {
        key: "goalpostDown",
        x: this.back.x,
        y: this.back.y + this.back.height / 2,
        scale: 1,
      },
    ];

    goalposts.forEach((goalpost) => {
      this[goalpost.key] = this.scene.add.image(
        goalpost.x,
        goalpost.y,
        goalpost.key,
      );
      this.add(this[goalpost.key]);
    });
  }
}
