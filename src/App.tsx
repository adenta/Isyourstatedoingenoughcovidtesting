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

function App() {
  const history = useHistory();
  const [selected, setSelected] = useState<Value>([]);

  return (
    <div className="App">
      <Block height="100%" width={['100%', '90%', '80%']}>
      <HeadingLarge>Is my state doing enough COVID testing?</HeadingLarge>
      <Switch>
        <Route exact path="/">
          <Select
          clearable={false}
          searchable={false}
          placeholder="State"
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
      </Block>
    </div>
  );
}

export default App;
