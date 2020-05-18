import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { caseData } from "./case-data.js";
import { Paragraph1 } from "baseui/typography";

import { StyledLink } from "baseui/link";
import { useStyletron } from "styletron-react";
import HowThisWorks from "./how-this-works";
import StatePicker from "./state-picker";
import { filterData, averageData } from "./helpers";
import { Value } from "baseui/select";

const State = () => {
  const [css] = useStyletron();
  const { postalCode } = useParams();

  const [statesData, setStatesData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredData = filterData(statesData, postalCode);
  const averageDailyTests = averageData(filteredData);

  const selectedValue: Value = caseData.filter(
    (caseDatum) => caseDatum.postalCode === postalCode
  );

  const selected = selectedValue[0];
  useEffect(() => {
    fetch("https://covidtracking.com/api/v1/states/daily.json")
      .then((res) => res.json())
      .then((json) => setStatesData(json));
  }, []);

  return (
    <>
      <HowThisWorks {...{ isOpen, setIsOpen }} />
      <StatePicker selected={selectedValue} />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          })}
        >
          <Paragraph1>
            <div
              className={css({
                fontSize: "40vmin",
                height: "100%",
                width: "100%",
                paddingBottom: "10vw",
                paddingTop: "10vw",
              })}
            >
              {averageDailyTests > selected.testsNeeded ? "YES" : "NO"}
            </div>
          </Paragraph1>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            })}
          >
            <Paragraph1>
              Daily tests needed: <b>{selected.testsNeeded}</b>
            </Paragraph1>
            <Paragraph1>
              Daily tests (avg): <b>{averageDailyTests}</b>
            </Paragraph1>
          </div>
        </div>
        <StyledLink>
          <span
            onClick={() => setIsOpen(true)}
            className={css({ cursor: "pointer" })}
          >
            How this works.
          </span>
        </StyledLink>
      </div>
    </>
  );
};

export default State;
