import Phaser from "phaser";

export default class Ground extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);

    this.scene = config.scene;
    this.config = this.scene.sys.game.config;
    this.back = this.scene.add.image(0, 0, "ground");

    // Align.scaleToGameW(this.config, this.back, 0.0044);

    this.add(this.back);
    this.scene.add.existing(this);

    this.setSize(this.back.displayWidth, this.config.height);
    this.addGoalpost();
  }

  addGoalpost() {
    const goalposts = [
      {
        key: "goalpostUp",
        x: 0,
        y: -this.back.height / 2,
        scale: 1,
      },
      {
        key: "goalpostDown",
        x: 0,
        y: this.back.height / 2,
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
