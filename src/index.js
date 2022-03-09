import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import GlobalStyle from "./style/GlobalStyle";

import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </Provider>,

  document.getElementById("root"),
);
