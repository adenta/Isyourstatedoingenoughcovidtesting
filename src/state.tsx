import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {caseData} from "./case-data.js";
import { Display1 } from "baseui/typography";
import { Select } from "baseui/select";
const SEVEN_DAYS_AGO = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
const reducer = (accumulator: any, currentValue: any) =>
  accumulator + currentValue;

const State = () => {
  const { state } = useParams();

  const [statesData, setStatesData] = useState<any>([]);
  const pastSevenDaysOfSelectedStatesData = statesData.filter(
    (stateData: { state: any; date: number }) => {
      const dateString = stateData.date.toString();
      const formattedDateString = `${dateString.substring(
        0,
        4
      )}/${dateString.substring(4, 6)}/${dateString.substring(6, 8)}`;
      const date = new Date(formattedDateString);
      return stateData.state === state && date > SEVEN_DAYS_AGO;
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
      .reduce(reducer, 0) / 7
  )
  const history = useHistory();

  const selected = caseData.filter((caseDatum)=> caseDatum.state === state);
  useEffect(() => {
    fetch("https://covidtracking.com/api/v1/states/daily.json")
      .then((res) => res.json())
      .then((json) => setStatesData(json));
  });

  return (
    <>
      <Select
        options={caseData}
        value={ selected}
        onChange={({ option }) => {
          if (!!option) {
            history.push(`/${option.state}`);
          }
        }}
        labelKey="state"
        valueKey="state"
      />
      <Display1>
       {(averageDailyTests < selected[0].testsNeeded) ? 'NO' : 'YES'}
      </Display1>
    </>
  );
};

export default State;
