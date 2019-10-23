import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Layout from "./atoms/Layout";

import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import history from './redux/history';

import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Join from "./pages/Join";

const App = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby/:roomNo" component={Lobby} />
          <Route exact path="/game/:roomNo" component={Game} />
          <Route exact path="/join/:roomNo" component={Join} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  </ThemeProvider>
);

export default App;
