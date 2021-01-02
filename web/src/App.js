import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import history from "./redux/history";

import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import LobbyProject from "./pages/LobbyProject";
import GameProject from "./pages/GameProject";
import Restarting from "./pages/Restarting";
import * as Admin from "./admin";

const App = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Switch>
        <Route path="/admin">
          <Admin.Layout>
            <Switch>
              <Route exact path="/admin/rooms" component={Admin.Rooms} />
              <Route exact path="/admin/rooms/:id" component={Admin.Room} />
              <Route
                exact
                path="/admin/questionbank"
                component={Admin.QuestionBankPage}
              />
              <Route exact path="/admin/logs" component={Admin.Logs} />
            </Switch>
          </Admin.Layout>
        </Route>

        <Switch>
          <Route exact path="/lobby/:roomNo" component={Lobby} />
          <Route exact path="/game/:roomNo" component={Game} />
          <Route exact path="/lobby/:roomNo/project" component={LobbyProject} />
          <Route exact path="/game/:roomNo/project" component={GameProject} />
          <Route exact path="/restart/:roomNo" component={Restarting} />
          <Route path="/" component={Home} />
        </Switch>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
