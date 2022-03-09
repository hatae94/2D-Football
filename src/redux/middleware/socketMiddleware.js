import {
  setError, setIsAllReady, gameOver, setPlayTime,
} from "../slice/roomSlice";

import socket from "../../utils/socket";

const socketMiddleware = () => (store) => {
  socket.on("errorMessage", ({ message }) => {
    store.dispatch(setError({ error: message }));
  });

  socket.on("isAllReadyCheck", ({ isAllReady }) => {
    store.dispatch(setIsAllReady({ isAllReady }));
  });

  socket.on("gameOver", ({ isGameOver }) => {
    store.dispatch(gameOver({ isGameOver }));
  });

  return (next) => (action) => {
    socket.emit(action.type, action.payload);

    return next(action);
  };
};

export default socketMiddleware;
