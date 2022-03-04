import Phaser from "phaser";

export default class Ground extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);

    this.scene = config.scene;

    this.background = this.scene.add.image(0, 0, "ground");

    const scaleX = this.scene.cameras.main.width / this.background.width;

    this.background.setScale(scaleX * 0.8);

    this.scene.alignGrid.placeAt(2, 1.5, this.background);

    this.add(this.background);
    this.scene.add.existing(this);
  }
}
