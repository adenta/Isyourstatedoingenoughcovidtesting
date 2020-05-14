import React from "react";
import { HeadingLarge, Paragraph1, DisplayMedium } from "baseui/typography";
import { css } from "react-select/src/components/Control";
import { Select, Value } from "baseui/select";
import { caseData } from "./case-data";
import { useStyletron } from "baseui";
import { useHistory } from "react-router-dom";
import { Block } from "baseui/block";

const StatePicker = ({ selected }: { selected: Value }) => {
  const [css] = useStyletron();
  const history = useHistory();
  return (
    <HeadingLarge>
      <Block
        display="flex"
        alignItems="center"
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
                [$theme.mediaQuery.small]: {
                  fontSize: $theme.sizing.scale700,
                },
              };
            },
          },
        }}
      >
        <span>Is</span>&nbsp;
        <Select
          placeholder="State"
          size="compact"
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
        &nbsp;
        <span>doing enough COVID testing?</span>
      </Block>
    </HeadingLarge>
  );
};

export default StatePicker;
