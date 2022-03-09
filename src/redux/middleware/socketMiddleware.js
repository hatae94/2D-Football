import {
  setIsAllReady, gameOver, setOtherUserName,
} from "../slice/roomSlice";

import socket from "../../utils/socket";

const socketMiddleware = () => (store) => {
  socket.on("isAllReadyCheck", ({ isAllReady }) => {
    store.dispatch(setIsAllReady({ isAllReady }));
  });

  socket.on("gameOver", ({ isGameOver }) => {
    store.dispatch(gameOver({ isGameOver }));
  });

  socket.on("sendPlayersNameList", (playersNameList) => {
    store.dispatch(setOtherUserName(playersNameList));
  });

  return (next) => (action) => {
    socket.emit(action.type, action.payload);

    return next(action);
  };
};

export default socketMiddleware;
