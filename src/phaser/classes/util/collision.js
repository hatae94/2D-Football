export default class Collision {
  static checkCollide(object1, object2) {
    const distX = Math.abs(object1.x - object2.x);
    const distY = Math.abs(object1.y - object2.y);

    if (distX < object1.width / 2) {
      if (distY < object1.height / 2) {
        return true;
      }
    }

    return false;
  }
}
