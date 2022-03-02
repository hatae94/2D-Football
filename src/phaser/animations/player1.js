export default function createPlayer1Animations(animation) {
  animation.create({
    key: "player1-up",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunUp", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-left",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunLeft", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-right",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunRight", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-down",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunDown", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-rightUp",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunRightUp", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-rightDown",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunRightDown", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-leftDown",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunLeftDown", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-leftUp",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player1RunLeftUp", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player1-stand",
    frameRate: 2,
    frames: animation.generateFrameNumbers("player1Stand", {
      start: 0,
      end: 1,
    }),
    repeat: Infinity,
  });
}
