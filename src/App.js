import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";

import AppBar from "./components/AppBar";
import Index from "./components/Index";
import Lyrics from "./components/tracks/Lyrics";

function App() {
  return (
    <Provider>
      <Router>
        <div className="bg-container" id="bg-dark">
          <AppBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
