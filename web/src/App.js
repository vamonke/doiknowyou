import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Layout from "./atoms/Layout";

import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import history from './redux/history';

import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
// import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby/:roomNo" component={Lobby} />
          {/* <Route exact path="/game/:roomNo" component={Game} /> */}
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Layout>
  </ThemeProvider>
);

export default App;
