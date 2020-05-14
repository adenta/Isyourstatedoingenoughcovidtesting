import React from "react";
import { HeadingLarge, HeadingSmall } from "baseui/typography";
import { Select, Value } from "baseui/select";
import { caseData } from "./case-data";
import { useHistory } from "react-router-dom";
import { Block } from "baseui/block";

const StatePicker = ({ selected }: { selected: Value }) => {
  const history = useHistory();

  const StateSelect = () => {
    return (
      <Select
        placeholder="State"
        overrides={{ Root: { style: { width: "auto", minWidth: "125px" } } }}
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
    );
  };

  return (
    <>
      <HeadingLarge>
        <Block
          display={["none", "none", "flex"]}
          alignItems="flex-start"
          justifyContent="center"
          overrides={{
            Block: {
              style: ({ $theme }) => {
                return {
                  [$theme.mediaQuery.large]: {
                    fontSize: $theme.sizing.scale1200,
                  },
                  [$theme.mediaQuery.medium]: {
                    fontSize: $theme.sizing.scale800,
                  },
                };
              },
            },
          }}
        >
          <span>Is</span>&nbsp;
          <StateSelect />
          &nbsp;
          <span>doing enough COVID testing?</span>
        </Block>
      </HeadingLarge>
      <Block display={["block", "block", "none"]}>
        <HeadingSmall>Is your state doing enough covid testing?</HeadingSmall>
        <StateSelect />
      </Block>
    </>
  );
};

export default StatePicker;
