import Phaser from "phaser";
import createBallAnimations from "../animations/ball";

import createPlayer1Animations from "../animations/player1";
import createPlayer2Animations from "../animations/player2";

export default class Preloader extends Phaser.Scene {
  preload() {
    this.load.setBaseURL("http://localhost:3000");

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
    this.load.image("redPlayerTackleLeftDown", "red_player_tackle_left_down.png");
    this.load.image("redPlayerTackleLeftUp", "red_player_tackle_left_up.png");
    this.load.image("redPlayerTackleLeft", "red_player_tackle_left.png");
    this.load.image("redPlayerTackleRightDown", "red_player_tackle_right_down.png");
    this.load.image("redPlayerTackleRightUp", "red_player_tackle_right_up.png");
    this.load.image("redPlayerTackleRight", "red_player_tackle_right.png");
    this.load.image("redPlayerTackleUp", "red_player_tackle_up.png");
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
    this.load.image("bluePlayerTackleDown", "blue_player_tackle_down.png");
    this.load.image("bluePlayerTackleLeftDown", "blue_player_tackle_left_down.png");
    this.load.image("bluePlayerTackleLeftUp", "blue_player_tackle_left_up.png");
    this.load.image("bluePlayerTackleLeft", "blue_player_tackle_left.png");
    this.load.image("bluePlayerTackleRightDown", "blue_player_tackle_right_down.png");
    this.load.image("bluePlayerTackleRightUp", "blue_player_tackle_right_up.png");
    this.load.image("bluePlayerTackleRight", "blue_player_tackle_right.png");
    this.load.image("bluePlayerTackleUp", "blue_player_tackle_up.png");
  }
}
