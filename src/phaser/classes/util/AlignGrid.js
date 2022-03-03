export default class AlignGrid {
  constructor(config) {
    this.config = config;

    if (!config.scene) {
      console.log("missing scene");
      return;
    }

    if (!config.rows) {
      config.rows = 5;
    }

    if (!config.cols) {
      config.cols = 5;
    }

    if (!config.height) {
      config.height = config.scene.game.config.height;
    }

    if (!config.width) {
      config.width = config.scene.game.config.width;
    }

    this.scene = config.scene;

    this.cellWidth = config.width / config.cols;
    this.cellHeight = config.height / config.rows;
  }

  show() {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);

    for (let i = 0; i < this.config.width; i += this.cellWidth) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }

    for (let i = 0; i < this.config.height; i += this.cellHeight) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width, i);
    }

    this.graphics.strokePath();
  }

  placeAt(x, y, object) {
    const cellX = this.cellWidth * x + this.cellWidth / 2;
    const cellY = this.cellHeight * y + this.cellHeight / 2;

    object.x = cellX;
    object.y = cellY;
  }

  placeAtIndex(index, object) {
    const cellY = Math.floor(index / this.config.cols);
    const cellX = index - cellY * this.config.cols;

    this.placeAt(cellX, cellY, object);
  }

  showNumbers() {
    this.show();

    let count = 0;

    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        const numberText = this.scene.add.text(0, 0, count, {
          color: "#ff0000",
        });

        numberText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numberText);

        count++;
      }
    }
  }
}
