import React, { useState, useEffect } from "react";
import "./App.css";
import { Select, Value } from "baseui/select";
import { Display1 } from "baseui/typography";
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

function App() {
  const history = useHistory();
  const [selected, setSelected] = useState<Value>([]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Select
            options={caseData}
            value={selected}
            onChange={({ option, value }) => {
              setSelected(value);
              if (!!option) {
                history.push(`/${option.state}`);
              }
            }}
            labelKey="state"
            valueKey="state"
          />
          <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Display1>Probably Not</Display1>
          </Block>
        </Route>
        <Route path={`/:state`}>
          <State />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
