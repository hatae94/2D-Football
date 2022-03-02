export default function createBallAnimations(animation) {
  animation.create({
    key: "ball-moving",
    frameRate: 4,
    frames: animation.generateFrameNumbers("ballMoving", {
      start: 0,
      end: 1,
    }),
    repeat: Infinity,
  });
}
