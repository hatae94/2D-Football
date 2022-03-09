import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import socketMiddleware from "../middleware/socketMiddleware";
import roomSliceReducer from "../slice/roomSlice";

const store = configureStore({
  reducer: {
    room: roomSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === "development") {
      return getDefaultMiddleware().concat([logger, socketMiddleware()]);
    }

    return getDefaultMiddleware().concat(socketMiddleware());
  },
});

export default store;
