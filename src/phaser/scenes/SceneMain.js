import Phaser from "phaser";

import {
  countPlayer1Goal,
  pauseGame,
  restartGame,
} from "../../redux/slice/gameResultSlices";
import store from "../../redux/store";

import Ground from "../classes/Ground";
import Ball from "../objects/Ball";
import Player from "../objects/Player";
import AlignGrid from "../classes/util/AlignGrid";
import socket from "../../utils/socket";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {
    const url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js";

    this.load.plugin("rexvirtualjoystickplugin", url, true);
  }

  create() {
    this.setGrid();

    this.createVirtualController(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas,
    );
    this.createGround();

    this.createGoalpost(this.ground.background);

    socket.emit("newPlayer");

    const clientPlayers = {};
    const playersFound = {};
    const clientBalls = {};

    socket.on("loadPlayer", (players) => {
      for (const id in players) {
        if (!clientPlayers[id] && id !== socket.id) {
          if (!players[id]) {
            clientPlayers[id] = new Player(this, 0, 0, "player1");
          } else {
            clientPlayers[id] = new Player(this, 0, 0, "player2");
          }

          this.otherPlayer = clientPlayers[id];
          this.otherPlayer.id = id;
          this.otherPlayer.body.id = id;

          playersFound[id] = true;
        }

        if (!clientPlayers[id] && id === socket.id) {
          if (!players[id]) {
            clientPlayers[id] = new Player(this, 0, 0, "player1");
          } else {
            clientPlayers[id] = new Player(this, 0, 0, "player2");
          }

          this.player = clientPlayers[id];
          this.player.id = id;
          this.player.body.id = id;

          playersFound[id] = true;
        }
      }

      for (const id in clientPlayers) {
        if (!playersFound[id]) {
          clientPlayers[id].destroy();
          delete playersFound[id];
          delete clientPlayers[id];
        }
      }

      if (this.otherPlayer) {
        this.createBall(this.player.id, this.otherPlayer.id, clientBalls);

        this.setOverlapToBall(this.player);

        this.createZoneGround(this.player, this.ball);

        this.createZoneGoalpost(this.player, this.ball);

        this.ballOriginPosition = {
          x: this.ball.body.x,
          y: this.ball.body.y,
        };
      }

      this.playerOriginPosition = {
        x: this.player.body.x,
        y: this.player.body.y,
      };
    });

    socket.on("otherPlayerMove", ({
      x, y, anims, id, serverTime,
    }) => {
      if (this.otherPlayer && this.otherPlayer.id === id) {
        this.otherPlayer.body.x = x;
        this.otherPlayer.body.y = y;

        this.otherPlayer.body.anims.play(anims, true);
      }
    });

    socket.on("ballMove", ({
      x, y, id, possession, serverTime,
    }) => {
      if (this.ball) {
        this.ball.body.possession = possession;

        this.ball.body.x = x;
        this.ball.body.y = y;

        this.ballOriginPosition.x = x;
        this.ballOriginPosition.y = y;
      }
    });

    this.createGameOverText();
  }

  update() {
    if (!this.player || !this.ball) {
      return;
    }

    this.player.handleMovement(this.joyStick.angle, this.joyStick.force);

    if (this.player.body.x !== this.playerOriginPosition.x || this.player.body.y !== this.playerOriginPosition.y) {
      socket.emit("movePlayer", {
        x: this.player.body.x,
        y: this.player.body.y,
        anims: this.player.body.anims.currentAnim.key,
        time: new Date(),
      });
    }

    if (this.ball.body.x !== this.ballOriginPosition.x || this.ball.body.y !== this.ballOriginPosition.y) {
      socket.emit("moveBall", {
        x: this.ball.body.x,
        y: this.ball.body.y,
        possession: this.ball.body.possession,
        time: new Date(),
      });
    }
  }

  createGameOverText() {
    this.gameOverText = this.add.text(200, 300, "Goal!", { fontSize: "3rem" });

    this.alignGrid.placeAt(1.25, 0.5, this.gameOverText);

    this.gameOverText.visible = false;
  }

  createZoneGoalpost(player, ball) {
    const goalpostWidth = this.goalpostUp.width * this.goalpostUp.scaleX;

    const goalpostUpHeight = this.goalpostUp.height;
    const goalpostUpX = this.goalpostUp.x;
    const goalpostUpY = this.goalpostUp.y - this.goalpostUp.height / 2;
    const goalpostUpLeftX = goalpostUpX - goalpostWidth / 2;
    const goalpostUpRightX = goalpostUpX + goalpostWidth / 2;
    const goalpostUpUpY = goalpostUpY - goalpostUpHeight / 2;

    const goalpostDownX = this.goalpostDown.x;
    const goalpostDownY = this.goalpostDown.y;
    const goalpostDownHeight = this.goalpostUp.height;
    const goalpostDownLeftX = goalpostDownX - goalpostWidth / 2;
    const goalpostDownRightX = goalpostDownX + goalpostWidth / 2;
    const goalpostDownDownY = goalpostDownY + goalpostDownHeight / 2;

    const zone = this.physics.add.staticGroup();

    zone.add(this.add.zone(goalpostUpX, goalpostUpUpY, goalpostWidth, 1));
    zone.add(this.add.zone(goalpostUpLeftX, goalpostUpY, 1, goalpostUpHeight));
    zone.add(this.add.zone(goalpostUpRightX, goalpostUpY, 1, goalpostUpHeight));
    zone.add(this.add.zone(goalpostDownX, goalpostDownDownY, goalpostWidth, 1));
    zone.add(
      this.add.zone(
        goalpostDownLeftX,
        goalpostDownY + goalpostDownHeight / 4,
        1,
        goalpostDownHeight / 2,
      ),
    );
    zone.add(
      this.add.zone(
        goalpostDownRightX,
        goalpostDownY + goalpostDownHeight / 4,
        1,
        goalpostDownHeight / 2,
      ),
    );

    this.physics.add.collider(ball.body, zone);
    this.physics.add.collider(player.body, zone);
  }

  createZoneGround(player, ball) {
    const groundWidth =
      this.ground.background.width * this.ground.background.scaleX;
    const groundHeight =
      this.ground.background.height * this.ground.background.scaleY;
    const groundX = this.ground.background.x;
    const groundY = this.ground.background.y;

    const leftX = groundX - groundWidth / 2;
    const rightX = groundX + groundWidth / 2;
    const upY = groundY - groundHeight / 2;
    const downY = groundY + groundHeight / 2;

    const goalpostWidth =
      groundWidth / 2 - (this.goalpostUp.width * this.goalpostUp.scaleX) / 2;
    const goalPostUpLeftSideCenterX = leftX + goalpostWidth / 2;
    const goalPostUpRightSideCenterX = rightX - goalpostWidth / 2;

    const zone = this.physics.add.staticGroup();

    zone.add(this.add.zone(leftX, groundY, 1, groundHeight));
    zone.add(this.add.zone(rightX, groundY, 1, groundHeight));
    zone.add(this.add.zone(goalPostUpLeftSideCenterX, upY, goalpostWidth, 1));
    zone.add(this.add.zone(goalPostUpRightSideCenterX, upY, goalpostWidth, 1));
    zone.add(this.add.zone(goalPostUpLeftSideCenterX, downY, goalpostWidth, 1));
    zone.add(
      this.add.zone(goalPostUpRightSideCenterX, downY, goalpostWidth, 1),
    );

    this.physics.add.collider(player.body, zone);
    this.physics.add.collider(ball.body, zone);
  }

  createBall(playerId, otherPlayerId, clientBalls) {
    const matchBallId = playerId + otherPlayerId;

    if (clientBalls[matchBallId]) {
      return;
    }

    this.ball = new Ball(this, this.centerX, this.centerY);
    // this.ball = clientBalls[matchBallId];
    // this.ball.id = matchBallId;

    this.ball.body.setBounce(0.2, 0.2);
    this.ball.body.setCollideWorldBounds(true);

    [this.goalpostUp, this.goalpostDown].forEach((goalpost) => {
      this.physics.add.overlap(
        this.ball.body,
        goalpost,
        this.HandleGoalCount,
        this.checkIsBallIn(this.ball),
        this,
      );
    });
  }

  setToStartPosition(player, otherPlayer, ball) {
    ball.body.possession = "";

    this.alignGrid.placeAtIndex(player.body.gridPosition, player.body);
    this.alignGrid.placeAtIndex(otherPlayer.body.gridPosition, otherPlayer.body);
    this.alignGrid.placeAt(2, 1.5, ball.body);

    socket.emit("movePlayer", {
      x: this.player.body.x,
      y: this.player.body.y,
      anims: this.player.body.anims.currentAnim.key,
    });
  }

  HandleGoalCount(ball, goalpost) {
    ball.setVelocity(0, 0);

    store.dispatch(countPlayer1Goal());
    store.dispatch(pauseGame());
    this.gameOverText.visible = true;
    this.physics.pause();

    setTimeout(() => {
      store.dispatch(restartGame());
      this.physics.resume();
      this.gameOverText.visible = false;

      this.setToStartPosition(this.player, this.otherPlayer, this.ball);
    }, 1000);
  }

  checkIsBallIn(ball) {
    return (_, goalpost) => {
      if (!ball) {
        return false;
      }

      return ball.isInGoalpost(goalpost);
    };
  }

  createGround() {
    this.ground = new Ground({ scene: this });
    this.ground.depth = -1;
  }

  setGrid() {
    const gridConfig = { row: 5, col: 5, scene: this };
    this.alignGrid = new AlignGrid(gridConfig);
    this.alignGrid.showNumbers();
  }

  createGoalpost(background) {
    const goalposts = [
      {
        key: "goalpostUp",
        x: background.x,
        y: background.y - (background.height / 2) * background.scale,
        scale: 2,
      },
      {
        key: "goalpostDown",
        x: background.x,
        y: background.y + (background.height / 2) * background.scale,
        scale: 2,
      },
    ];

    goalposts.forEach((goalpost) => {
      this[goalpost.key] = this.physics.add.image(
        goalpost.x,
        goalpost.y,
        goalpost.key,
      );
      this[goalpost.key].scale = goalpost.scale;
      this[goalpost.key].depth = 1;
    });
  }

  createVirtualController(x, y, canvas) {
    this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: x + canvas.width / 4,
      y: y + canvas.height / 3,
      radius: 50,
      base: this.add.circle(0, 0, 70, 0x888888),
      thumb: this.add.circle(0, 0, 30, 0xcccccc),
    });

    this.button = this.add
      .circle(
        x - canvas.width / 4 + this.cameras.main.scrollX,
        y + canvas.height / 3 + this.cameras.main.scrollY,
        30,
        0x888888,
      )
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        const player = this.player.body;
        const { direction } = this.player.body;
        const ball = this.ball.body;

        if (!ball.possession) {
          return;
        }

        switch (direction) {
          case "right":
            ball.x = player.x + player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(100, 0);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "rightDown":
            ball.x = player.x + player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(100, 100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "down":
            ball.x = player.x;
            ball.y = player.y + player.height * 2;

            ball.setVelocityY(100);
            setTimeout(() => {
              ball.setVelocityY(0);
              ball.stop();
            }, 1000);
            break;
          case "leftDown":
            ball.x = player.x - player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(-100, 100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "left":
            ball.x = player.x - player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(-100, 0);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "leftUp":
            ball.x = player.x - player.width * 2;
            ball.y = player.y - player.height * 1.5;

            ball.setVelocity(-100, -100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          case "up":
            ball.x = player.x;
            ball.y = player.y - player.height * 2;

            ball.setVelocityY(-100);
            setTimeout(() => {
              ball.setVelocityY(0);
              ball.stop();
            }, 1000);
            break;
          case "rightUp":
            ball.x = player.x + player.width * 2;
            ball.y = player.y + player.height * 1.5;

            ball.setVelocity(100, -100);
            setTimeout(() => {
              ball.setVelocity(0, 0);
              ball.stop();
            }, 1000);
            break;
          default:
            ball.x = player.x;
            ball.y = player.y + player.height * 2;

            ball.setVelocityY(100);

            setTimeout(() => {
              ball.setVelocityY(0);
              ball.stop();
            }, 1000);
        }

        ball.possession = "";

        socket.emit("moveBall", {
          x: ball.x,
          y: ball.y,
          possession: ball.possession,
          time: new Date(),
        });
      });

    this.alignGrid.placeAt(3.5, 3.5, this.joyStick);
    this.alignGrid.placeAt(0.5, 3.5, this.button);
  }

  setOverlapToBall(player) {
    this.physics.add.overlap(
      player.body,
      this.ball.body,
      this.handlePlayerDribbleBall,
      this.checkHasBall(player),
      this,
    );
  }

  handlePlayerDribbleBall(player, ball) {
    this.ball.move();

    const distanceFromGoalpostUp = this.goalpostUp.y - ball.y;
    const distanceFromGoalpostDown = this.goalpostDown.y - ball.y;

    // if (distanceFromGoalpostUp > 0 || distanceFromGoalpostDown < 0) {
    //   this.setToStartPosition(player, this.otherPlayer, this.ball);
    //   return;
    // }

    ball.possession = player.id;

    const { direction } = player;

    switch (direction) {
      case "right":
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "rightDown":
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "down":
        ball.x = player.x;
        ball.y = player.y + player.height * 1.7;
        break;
      case "leftDown":
        ball.x = player.x - player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "left":
        ball.x = player.x - player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        break;
      case "leftUp":
        ball.x = player.x - player.width * 1.2;
        ball.y = player.y;
        break;
      case "up":
        ball.x = player.x;
        ball.y = player.y - player.height * 1.7;
        break;
      case "rightUp":
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y;
        break;
      default:
        ball.x = player.x + player.width * 1.2;
        ball.y = player.y + player.height * 1.2;
        this.ball.stop();
    }
  }

  checkHasBall(player) {
    return (_, ball) => {
      if (!player) {
        return false;
      }

      return player.canHaveBall(ball);
    };
  }
}
