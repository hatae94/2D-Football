import Phaser from "phaser";
import G from "../../constants";
import global from "../../global";

export default class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    this.text1 = this.scene.add.text(0, 0, "SCORE: 0");
    this.text1.setOrigin(0.5, 0.5);
    this.add(this.text1);

    this.scene.add.existing(this);

    global.emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
  }

  scoreUpdated() {
    this.text1.setText(`SCORE:${global.model.score}`);
  }
}
