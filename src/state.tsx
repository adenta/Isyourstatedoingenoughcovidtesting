import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { caseData } from "./case-data.js";
import { Display1, Display3, Paragraph1, HeadingLarge } from "baseui/typography";
import { Select } from "baseui/select";
import { Block } from "baseui/block";
import { StyledLink as Link, StyledLink } from "baseui/link";
import { useStyletron } from "styletron-react";
import HowThisWorks from "./how-this-works";
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
  const history = useHistory();

  const selected = caseData.filter((caseDatum) => caseDatum.postalCode === postalCode);
  useEffect(() => {
    fetch("https://covidtracking.com/api/v1/states/daily.json")
      .then((res) => res.json())
      .then((json) => setStatesData(json));
  },[]);

  return (
    <>
      <HowThisWorks {...{ isOpen, setIsOpen }} />
      <HeadingLarge>
        Is {selected[0].stateName} doing enough COVID testing?
        </HeadingLarge>
      <Select
        clearable={false}
        searchable={false}
        options={caseData}
        value={selected}
        onChange={({ option }) => {
          if (!!option) {
            history.push(`/${option.postalCode}`);
          }
        }}
        labelKey="stateName"
        valueKey="postalCode"
      />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          <Display1>
            {averageDailyTests > selected[0].testsNeeded ? "YES" : "NO"}
          </Display1>
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
