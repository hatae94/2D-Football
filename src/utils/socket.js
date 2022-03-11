import { io } from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SERVER_PORT, { path: "/socket.io" });

export default socket;
