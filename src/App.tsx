import React, { useState, useEffect } from "react";
import "./App.css";
import { testsNeeded } from "./case-data.js";
import { Select, Value } from "baseui/select";
import { Display1 } from "baseui/typography";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import State from "./state";

const SEVEN_DAYS_AGO = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
const reducer = (accumulator: any, currentValue: any) =>
  accumulator + currentValue;

function App() {
  const [statesData, setStatesData] = useState<any>([]);
  const [selected, setSelected] = useState<Value>([]);
  const isSelected = selected.length > 0;

  useEffect(() => {
    fetch("https://covidtracking.com/api/v1/states/daily.json")
      .then((res) => res.json())
      .then((json) => setStatesData(json));
  });

  return (
    <div className="App">
      <Router>
      <Select
        options={testsNeeded}
        value={selected}
        onChange={(params) => {
          console.log(params);
          setSelected(params.value);
        }}
        labelKey="state"
        valueKey="state"
      />
      <Switch>
      <Route path={`${match.path}/:state`}>
        <State />
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
