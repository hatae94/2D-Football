import { createSlice } from "@reduxjs/toolkit";

const gameResultSlice = createSlice({
  name: "gameResult",
  initialState: {
    player1Score: 0,
    player2Score: 0,
    isPlayer1Win: false,
    isPlayer2Win: false,
    isPaused: false,
  },
  reducers: {
    countPlayer1Goal(state, action) {
      state.player1Score += 1;
    },
    pauseGame(state, action) {
      state.isPaused = true;
    },
    restartGame(state, action) {
      state.isPaused = false;
    },
  },
});

export const { countPlayer1Goal, pauseGame, restartGame } =
  gameResultSlice.actions;
export default gameResultSlice.reducer;
