import G from "../../constants";
import global from "../../global";

export default class Model {
  constructor() {
    this._score = 0;
  }

  set score(val) {
    this._score = val;
    console.log("score updated!");
    global.emitter.emit(G.SCORE_UPDATED);
  }

  get score() {
    return this._score;
  }
}
