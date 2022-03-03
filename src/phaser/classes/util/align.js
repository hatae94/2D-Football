import Phaser from "phaser";

export default class Align {
  static setPosition(object, distance) {
    object.x = window.innerWidth / 2;
    object.y = window.innerHeight / 2;
  }
}
