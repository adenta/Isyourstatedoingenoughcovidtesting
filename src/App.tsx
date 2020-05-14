import React, { useState, useEffect } from "react";
import "./App.css";
import { Select, Value } from "baseui/select";
import { Display1, HeadingLarge } from "baseui/typography";
import { caseData } from "./case-data.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import State from "./state";
import { Block } from "baseui/block";
import StatePicker from "./state-picker";

function App() {
  const history = useHistory();
  const [selected, setSelected] = useState<Value>([]);

  return (
    <div className="App">
      <Block height="100%" width={["100%", "90%", "80%"]}>
        <Switch>
          <Route exact path="/">
          <StatePicker selected={selected}/>
            <Block
              display="flex"
              flexDirection="column"
              alignItems="center"
              height="100%"
            >
              <Display1>Probably Not</Display1>
            </Block>
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
