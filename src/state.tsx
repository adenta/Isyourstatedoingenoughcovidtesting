import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { caseData } from "./case-data.js";
import { Paragraph1 } from "baseui/typography";

import { StyledLink } from "baseui/link";
import { useStyletron } from "styletron-react";
import HowThisWorks from "./how-this-works";
import StatePicker from "./state-picker";
const SEVEN_DAYS_AGO = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
const reducer = (accumulator: any, currentValue: any) =>
  accumulator + currentValue;

const State = () => {
  const [css] = useStyletron();
  const { postalCode } = useParams();

  const [statesData, setStatesData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pastSevenDaysOfSelectedStatesData = statesData.filter(
    (stateData: { state: any; date: number }) => {
      const dateString = stateData.date.toString();
      const formattedDateString = `${dateString.substring(
        0,
        4
      )}/${dateString.substring(4, 6)}/${dateString.substring(6, 8)}`;
      const date = new Date(formattedDateString);
      return stateData.state === postalCode && date > SEVEN_DAYS_AGO;
    }
  );
  const averageDailyTests = Math.round(
    pastSevenDaysOfSelectedStatesData
      .map((stateData: { totalTestResults: any }, index: number) => {
        if (index === pastSevenDaysOfSelectedStatesData.length - 1) {
          return 0;
        }
        return (
          stateData.totalTestResults -
          pastSevenDaysOfSelectedStatesData[index + 1].totalTestResults
        );
      })
      .reduce(reducer, 0) / pastSevenDaysOfSelectedStatesData.length
  );

  const selected = caseData.filter(
    (caseDatum) => caseDatum.postalCode === postalCode
  );
  useEffect(() => {
    fetch("https://covidtracking.com/api/v1/states/daily.json")
      .then((res) => res.json())
      .then((json) => setStatesData(json));
  }, []);

  return (
    <>
      <HowThisWorks {...{ isOpen, setIsOpen }} />
      <StatePicker selected={selected} />
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
              {averageDailyTests > selected[0].testsNeeded ? "YES" : "NO"}
            </div>
          </Paragraph1>
          <div className={css({display:'flex', flexDirection: 'column', alignItems: 'flex-end'})}>
            <Paragraph1>
              Daily tests needed: <b>{selected[0].testsNeeded}</b>
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
