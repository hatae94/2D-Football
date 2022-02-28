export default class Align {
  static scaleToGameW(canvas, object, per) {
    object.scaleX = canvas.width * per;
    object.scaleY = object.scaleX;
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
