import { createSlice, createAction } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomInfo: {
      time: 3,
      isAllReady: false,
      errorMessage: "",
      isPaused: false,
      isGameOver: false,
    },
    userInfo: {
      name: "",
      score: 0,
      isReady: false,
    },
  },
  reducers: {
    getTime(state, payload) {
      state.roomInfo.time = payload.time;
    },
    reduceTime(state) {
      state.roomInfo.time -= 1;
    },
    countScore(state) {
      state.userInfo.score += 1;
    },
    setName(state, { payload: { name } }) {
      state.userInfo.name = name;
    },
    setIsReady(state) {
      state.userInfo.isReady = !state.userInfo.isReady;
    },
    setError(state, { payload: { error } }) {
      state.roomInfo.errorMessage = error;
    },
    setIsAllReady(state, { payload: { isAllReady } }) {
      state.roomInfo.isAllReady = isAllReady;
    },
    gameOver(state, { payload: { isGameOver } }) {
      state.roomInfo.isGameOver = isGameOver;
    },
  },
});

export const {
  getTime, reduceTime, countScore, setName, setIsReady, setError, setIsAllReady, gameOver,
} =
roomSlice.actions;

export const setUserState = createAction("setUserState");
export const error = createAction("errorMessage");
export const checkIsAllReady = createAction("checkIsAllReady");
export const makeRoom = createAction("makeRoom");
export const setGameOver = createAction("setGameOver");

export default roomSlice.reducer;
