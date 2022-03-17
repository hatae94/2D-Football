import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  roomInfo: {
    time: 180,
    isAllReady: false,
    isPaused: false,
    isGameOver: false,
    suddenDisconnectedMessage: "",
  },
  userInfo: {
    name: "",
    score: 0,
    isReady: false,
  },
  otherUserInfo: {
    name: "",
    score: 0,
  },
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getTime(state, { payload: { time } }) {
      state.roomInfo.time = time;
    },
    reduceTime(state) {
      state.roomInfo.time -= 1;
    },
    countPlayerScore(state) {
      state.userInfo.score += 1;
    },
    countOtherPlayerScore(state) {
      state.otherUserInfo.score += 1;
    },
    setName(state, { payload: { name } }) {
      state.userInfo.name = name;
    },
    setIsReady(state) {
      state.userInfo.isReady = !state.userInfo.isReady;
    },
    setIsAllReady(state, { payload: { isAllReady } }) {
      state.roomInfo.isAllReady = isAllReady;
    },
    gameOver(state, { payload: { isGameOver } }) {
      state.roomInfo.isGameOver = isGameOver;
    },
    setOtherUserName(state, { payload: { playersNameList } }) {
      playersNameList.forEach((name) => {
        if (state.userInfo.name !== name) {
          state.otherUserInfo.name = name;
        }
      });
    },
    pauseGame(state, payload) {
      state.roomInfo.isPaused = true;
    },
    restartGame(state, payload) {
      state.roomInfo.isPaused = false;
    },
    suddenDisconnectedMessage(state, { payload: { message } }) {
      state.roomInfo.suddenDisconnectedMessage = message;
    },
    setToInitial(state, payload) {
      return initialState;
    },
  },
});

export const {
  getTime, reduceTime, countPlayerScore, setName, setIsReady, setIsAllReady, gameOver, countOtherPlayerScore, setOtherUserName, pauseGame, restartGame, setToInitial, suddenDisconnectedMessage,
} =
roomSlice.actions;

export const setUserState = createAction("setUserState");
export const checkIsAllReady = createAction("checkIsAllReady");
export const makeRoom = createAction("makeRoom");
export const setGameOver = createAction("setGameOver");
export const resetObjects = createAction("resetObjects");
export const someUserDisconnected = createAction("someUserDisconnected");

export default roomSlice.reducer;
