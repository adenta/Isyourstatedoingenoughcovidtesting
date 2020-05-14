import React from "react";
import "./App.css";
import { Value } from "baseui/select";
import { Switch, Route } from "react-router-dom";
import State from "./state";
import { Block } from "baseui/block";
import StatePicker from "./state-picker";

function App() {
  const selected: Value = [];

  return (
    <div className="App">
      <Block height="100%" width={["100%", "90%", "80%"]}>
        <Switch>
          <Route exact path="/">
            <StatePicker selected={selected} />
          </Route>
          <Route path={`/:postalCode`}>
            <State />
          </Route>
        </Switch>
      </Block>
    </div>
  );
}

export default App;
