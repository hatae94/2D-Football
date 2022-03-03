import Phaser from "phaser";
import Ground from "../classes/Ground";
import Ball from "../gameObject/Ball";
import Player from "../gameObject/Player";
import AlignGrid from "../classes/util/AlignGrid";

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

    this.createBall();

    this.createGround();

    this.createPlayer();

    this.createGoalpost(this.ground.background);

    this.createZoneGround(this.player1, this.ball);

    this.createZoneGoalpost(this.player1, this.ball);
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

  createBall() {
    this.ball = new Ball(this, this.centerX, this.centerY - 0);
    this.ball.body.setBounce(0.2, 0.2);
    this.ball.body.setCollideWorldBounds(true);
  }

  createGround() {
    this.ground = new Ground({ scene: this });
    this.ground.depth = -1;
  }

  setGrid() {
    const gridConfig = { row: 5, col: 5, scene: this };
    this.alignGrid = new AlignGrid(gridConfig);
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
      this[goalpost.key] = this.add.image(goalpost.x, goalpost.y, goalpost.key);
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
        const player = this.player1.body;

        if (!player.hasBall) {
          return;
        }

        const { direction } = this.player1.body;
        const ball = this.ball.body;

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

        player.hasBall = false;
      });

    this.alignGrid.placeAt(3.5, 3.5, this.joyStick);
    this.alignGrid.placeAt(0.5, 3.5, this.button);
  }

  createPlayer() {
    const player = new Player(this, this.centerX, this.centerY - 50, "player1");
    this.player1 = player;

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

    player.hasBall = true;

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
    return (ball) => {
      if (!player) {
        return false;
      }

      return player.canHaveBall(ball);
    };
  }

  update() {
    this.player1.handleMovement(this.joyStick.angle, this.joyStick.force);
  }
}
