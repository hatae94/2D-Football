export default function createPlayer2Animations(animation) {
  animation.create({
    key: "player2-up",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunUp", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-left",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunLeft", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-right",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunRight", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-down",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunDown", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-rightUp",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunRightUp", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-rightDown",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunRightDown", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-leftDown",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunLeftDown", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-leftUp",
    frameRate: 5,
    frames: animation.generateFrameNumbers("player2RunLeftUp", {
      start: 0,
      end: 3,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-stand",
    frameRate: 2,
    frames: animation.generateFrameNumbers("player2Stand", {
      start: 0,
      end: 1,
    }),
    repeat: Infinity,
  });

  animation.create({
    key: "player2-tackle-down",
    frameRate: 1,
    frames: animation.generateFrameNumbers("redPlayerTackleDown", {
      start: 0,
      end: 1,
    }),
    repeat: Infinity,
  });
}
