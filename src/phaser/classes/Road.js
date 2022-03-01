import Phaser from "phaser";
import G from "../constants";
import global from "../global";
import Align from "./util/align";
import Collision from "./util/collision";

export default class Road extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.config = this.scene.sys.game.config;
    this.back = this.scene.add.image(0, 0, "road");
    Align.scaleToGameW(this.config, this.back, 0.002);
    this.add(this.back);
    this.scene.add.existing(this);

    this.setSize(this.back.displayWidth, this.config.height);

    this.lineGroup = this.scene.add.group();

    this.count = 0;
    // add car
    this.car = this.scene.add.sprite(
      this.displayWidth / 4,
      this.config.height * 0.4,
      "cars",
    );
    Align.scaleToGameW(this.config, this.car, 0.002);
    this.add(this.car);

    // add click
    this.back.setInteractive();
    this.back.on("pointerdown", this.changeLanes, this);
    this.addObject();
  }

  addObject() {
    const objects = [
      { key: "pcar1", speed: 10, scale: 0.002 },
      { key: "pcar2", speed: 10, scale: 0.002 },
      { key: "cone", speed: 20, scale: 0.001 },
      { key: "barrier", speed: 20, scale: 0.0015 },
    ];
    const index = Math.floor(Math.random() * 4);
    const { key, speed, scale } = objects[index];

    this.object = this.scene.add.sprite(
      -this.displayWidth / 4,
      -this.config.height / 2,
      key,
    );
    this.object.speed = speed;

    const lane = Math.random() * 100;

    if (lane < 50) {
      this.object.x = this.displayWidth / 4;
    }

    Align.scaleToGameW(this.config, this.object, scale);
    this.add(this.object);
  }

  changeLanes() {
    if (this.car.x > 0) {
      this.car.x = -this.displayWidth / 4;
    } else {
      this.car.x = this.displayWidth / 4;
    }
  }

  makeLines() {
    this.vSpace = this.displayHeight / 10;

    for (let i = 0; i < 20; i++) {
      const line = this.scene.add.image(this.x, this.vSpace * i, "line");
      line.originY = line.y;

      this.lineGroup.add(line);
    }
  }

  moveLines() {
    this.lineGroup.children.iterate((child) => {
      child.y += this.vSpace / 20;
    });

    this.count++;

    if (this.count === 20) {
      this.count = 0;

      this.lineGroup.children.iterate((child) => {
        child.y = child.originY;
      });
    }
  }

  moveObject() {
    this.object.y += this.vSpace / this.object.speed;

    if (Collision.checkCollide(this.car, this.object)) {
      this.car.alpha = 0.5;
    } else {
      this.car.alpha = 1;
    }

    if (this.object.y > this.config.height / 2) {
      global.emitter.emit(G.UP_POINTS, 1);
      this.object.destroy();
      this.addObject();
    }
  }
}
