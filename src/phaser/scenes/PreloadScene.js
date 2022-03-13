import Phaser from "phaser";
import createBallAnimations from "../animations/ball";

import createPlayer1Animations from "../animations/player1";
import createPlayer2Animations from "../animations/player2";

export default class Preloader extends Phaser.Scene {
  preload() {
    this.load.setBaseURL(process.env.REACT_APP_CLIENT_PORT);

    this.loadGroundImage();
    this.loadBallImage();
    this.loadPlayer1Image();
    this.loadPlayer2Image();

    this.load.on("complete", () => {
      this.scene.start("SceneMain");
    });
  }

  create() {
    createPlayer1Animations(this.anims);
    createPlayer2Animations(this.anims);
    createBallAnimations(this.anims);
  }

  loadGroundImage() {
    this.load.image("ground", "ground.png");
    this.load.image("goalpostUp", "goalpost_up.png");
    this.load.image("goalpostDown", "goalpost_down.png");
  }

  loadBallImage() {
    this.load.image("ballStopped", "ball_stopped.png");
    this.load.spritesheet("ballMoving", "ball_moving.png", {
      frameWidth: 3,
      frameHeight: 2,
    });
  }

  loadPlayer2Image() {
    this.load.spritesheet("player2RunRight", "red_player_run_right_8_7.png", {
      frameWidth: 8,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player2RunRightUp",
      "red_player_run_right_up_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
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
    this.load.spritesheet("player2Stand", "red_player_stand_7_7.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
    this.load.spritesheet("redPlayerTackleDown", "red_player_tackle_down.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
  }

  loadPlayer1Image() {
    this.load.spritesheet("player1RunRight", "blue_player_run_right_8_7.png", {
      frameWidth: 8,
      frameHeight: 7,
    });
    this.load.spritesheet(
      "player1RunRightUp",
      "blue_player_run_right_up_8_7.png",
      {
        frameWidth: 8,
        frameHeight: 7,
      },
    );
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
    this.load.spritesheet("player1Stand", "blue_player_stand_7_7.png", {
      frameWidth: 7,
      frameHeight: 7,
    });
  }
}
