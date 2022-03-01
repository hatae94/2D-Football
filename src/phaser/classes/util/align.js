import Phaser from "phaser";

export default class Align {
  static scaleToGameW(canvas, object) {
    object.setOrigin(0);
  }

  static center(canvas, object) {
    object.x = canvas.width / 2;
    object.y = canvas.height / 2;
  }

  static centerH(canvas, object) {
    object.x = canvas.width / 2;
  }

  static centerV(canvas, object) {
    object.y = canvas.height / 2;
  }
}
