import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  roomInfo: {
    time: 120,
    isAllReady: false,
    isPaused: false,
    isGameOver: false,
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
    getTime(state, payload) {
      state.roomInfo.time = payload.time;
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
    pauseGame(state, action) {
      state.roomInfo.isPaused = true;
    },
    restartGame(state, action) {
      state.roomInfo.isPaused = false;
    },
    setToInitial(state, action) {
      return initialState;
    },
  },
});

export const {
  getTime, reduceTime, countPlayerScore, setName, setIsReady, setIsAllReady, gameOver, countOtherPlayerScore, setOtherUserName, pauseGame, restartGame, setToInitial,
} =
roomSlice.actions;

export const setUserState = createAction("setUserState");
export const checkIsAllReady = createAction("checkIsAllReady");
export const makeRoom = createAction("makeRoom");
export const setGameOver = createAction("setGameOver");
export const resetObjects = createAction("resetObjects");

export default roomSlice.reducer;
