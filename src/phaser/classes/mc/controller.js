import global from "../../global";
import G from "../../constants";

export default class Controller {
  constructor() {
    global.emitter.on(G.SET_SCORE, this.setScore);
    global.emitter.on(G.UP_POINTS, this.upPoints);
  }

  setScore(score) {
    global.model.score = score;
  }

  upPoints(points) {
    const score = global.model.score + points;

    global.model.score = score;
  }
}
