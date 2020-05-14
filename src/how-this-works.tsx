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
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
        faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
      </ModalBody>
    </Modal>
  );
};

export default HowThisWorks;
