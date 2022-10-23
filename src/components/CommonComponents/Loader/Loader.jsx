import React from "react";
import loaderFile from "../../../assets/images/loaderFile.gif";
import { Modal } from "react-bootstrap";
import "../../../assets/styles/Loader.scss";

const Loader = (props) => {
  return (
    <Modal
      {...props}
      show={props.showLoader}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="customContent"
    >
      <Modal.Body>
        <img src={loaderFile} alt="loader_file" className="img-fluid" />
      </Modal.Body>
    </Modal>
  );
};

export default Loader;
