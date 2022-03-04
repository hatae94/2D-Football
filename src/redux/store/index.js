import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import gameResultSliceReducer from "../slice/gameResultSlices";

const store = configureStore({
  reducer: {
    gameResult: gameResultSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
