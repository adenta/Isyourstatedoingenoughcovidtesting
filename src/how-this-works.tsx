import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
const HowThisWorks = ({ isOpen, setIsOpen } : any) => {
  return (
    <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <ModalHeader>How this works</ModalHeader>
      <ModalBody>
        This webpage is based on this NPR article. Tests per day information is coming from Harvard, and the amount of tests being performed each day is coming from this API. I am not a medical professional.
      </ModalBody>
    </Modal>
  );
};

export default HowThisWorks;
