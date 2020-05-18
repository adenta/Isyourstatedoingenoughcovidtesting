import React from "react";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { StyledLink } from "baseui/link";
const HowThisWorks = ({ isOpen, setIsOpen }: any) => {
  return (
    <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <ModalHeader>How this works</ModalHeader>
      <ModalBody>
        This webpage is based on{" "}
        <StyledLink href="https://www.npr.org/sections/health-shots/2020/05/07/851610771/u-s-coronavirus-testing-still-falls-short-hows-your-state-doing">
          this
        </StyledLink>{" "}
        NPR article. Tests per day information is coming from{" "}
        <StyledLink href="https://docs.google.com/spreadsheets/d/1KrhXO7aLH5v1hqJltbxSSIlrp4u2F_TqhQJu9w7z0ow/edit#gid=754849875">
          Harvard
        </StyledLink>
        , and the amount of tests being performed each day is coming from{" "}
        <StyledLink href="https://covidtracking.com/">this</StyledLink> API.{" "}
        <StyledLink href="https://linkedin.com/in/adenta">I</StyledLink> am not
        a medical professional, just a citizen who believes we should focus on
        how much testing is being done state-by-state, when talking about
        reopening the country.
      </ModalBody>
    </Modal>
  );
};

export default HowThisWorks;
