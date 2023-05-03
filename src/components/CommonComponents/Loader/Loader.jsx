import React from "react";
import loaderFile from "../../../assets/images/loaderFile.gif";
import { Modal } from "react-bootstrap";
import "../../../assets/styles/Loader.scss";

const Loader = ({ showLoader }) => {
  return (
    <Modal
      show={showLoader}
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
