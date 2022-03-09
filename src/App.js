import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import MainPage from "./components/MainPage";
import RoomPage from "./components/RoomPage";
import Game from "./components/Game";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
        <Redirect from="*" to="/" />
      </Route>
      <Route path="/room" exact>
        <RoomPage />
        <Redirect from="*" to="/" />
      </Route>
      <Route path="/room/game" exact>
        <Game />
        <Redirect from="*" to="/" />
      </Route>
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default App;
