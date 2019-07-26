import "./App.scss";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { clear, setPaginationOptions } from "./utils/StorageService";

import AppNavbar from "./Components/AppNavbar";
import GameDetails from "./Components/GameDetails";
import GamesList from "./Components/GamesList";

class App extends Component {
  constructor(props) {
    super(props);
    clear();
    setPaginationOptions();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <AppNavbar search={this.search} />
          <Switch>
            <Route path="/" exact component={GamesList} />
            <Route path="/games/:gameRank" exact component={GameDetails} />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
