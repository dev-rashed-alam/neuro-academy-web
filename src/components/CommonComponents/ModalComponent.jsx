import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "./Button";

const renderButton = (buttonList) => {
  if (buttonList) {
    return buttonList.map((item, index) => {
      return (
        <Button
          onClickEvent={item.action}
          className={item.className}
          key={item.name + index}
          name={item.name}
        />
      );
    });
  }
};

export const ModalComponent = (props) => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {props.title && (
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>{renderButton(props.buttons)}</Modal.Footer>
    </Modal>
  );
};
