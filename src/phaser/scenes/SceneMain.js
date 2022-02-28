import Phaser from "phaser";
import ScoreBox from "../classes/comp/scoreBox";
import Controller from "../classes/mc/controller";
// import Road from "../classes/Road";
import Align from "../classes/util/align";
import global from "../global";
import Model from "../classes/mc/Model";
import Ground from "../classes/Ground";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {
    this.load.image("ground", "ground.png");
    this.load.image("goalpostUp", "goalpost_up.png");
    this.load.image("goalpostDown", "goalpost_down.png");
    this.load.image("ballStopped", "ball_stopped.png");
    this.load.spritesheet("ballMoving", "ball_moving.png", {
      frameWidth: 5,
      frameHeight: 2,
    });
    this.load.spritesheet("player1RunRight", "blue_player_run_right_8_7.png", {
      frameWidth: 8,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player1RunRightDown",
      "blue_player_run_right_down_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
    this.load.spritesheet("player1RunDown", "blue_player_run_down_7_7.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player1RunLeftDown",
      "blue_player_run_left_down_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
    this.load.spritesheet("player1RunLeft", "blue_player_run_left_8_7.png", {
      frameWidth: 8,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player1RunLeftUp",
      "blue_player_run_left_up_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
    this.load.spritesheet("player1RunUp", "blue_player_run_up_7_7.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
    this.load.spritesheet("player2RunRight", "red_player_run_right_8_7.png", {
      frameWidth: 8,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player2RunRightDown",
      "red_player_run_right_down_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
    this.load.spritesheet("player2RunDown", "red_player_run_down_7_7.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player2RunLeftDown",
      "red_player_run_left_down_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
    this.load.spritesheet("player2RunLeft", "red_player_run_left_8_7.png", {
      frameWidth: 8,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player2RunLeftUp",
      "red_player_run_left_up_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
    this.load.spritesheet("player2RunUp", "red_player_run_up_7_7.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
    // --- test
    // this.load.image("road", "road.jpg");
    // this.load.spritesheet("cars", "cars.png", {
    //   frameWidth: 60,
    //   frameHeight: 126,
    // });
    // this.load.image("line", "line.png");
    // this.load.image("pcar1", "pcar1.png");
    // this.load.image("pcar2", "pcar2.png");
    // this.load.image("cone", "cone.png");
    // this.load.image("barrier", "barrier.png");
  }

  create() {
    const { canvas } = this.sys;
    this.ground = new Ground({ scene: this });

    Align.center(canvas, this.ground);
    // --- test
    // this.road = new Road({ scene: this });

    // Align.center(canvas, this.road);
    // this.road.makeLines();

    global.emitter = new Phaser.Events.EventEmitter();
    global.controller = new Controller();
    global.model = new Model();

    this.scoreBox = new ScoreBox({ scene: this });
    this.scoreBox.x = canvas.width - 50;
    this.scoreBox.y = 50;

    global.model.score = 100;
  }

  update() {
    // this.road.moveLines();
    // this.road.moveObject();
  }
}
