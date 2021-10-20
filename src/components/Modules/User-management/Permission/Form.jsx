import React, { Component } from "react";
import { ModalComponent } from "../../../CommonComponents/ModalComponent";
import { Col, Row } from "react-bootstrap";
import TextComponent from "../../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../../CommonComponents/Form/SelectComponent";

const optionForModule = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export class Form extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    this.props.triggerModal();
  };

  render() {
    return (
      <ModalComponent
        show={this.props.modalShow}
        onHide={this.props.triggerModal}
        size="lg"
        title="Add New Permission"
        scrollable={false}
        showCloseButton={true}
        buttons={[
          {
            name: "Submit",
            action: this.handleSubmit,
            className: "btn btn-primary",
          },
          {
            name: "Close",
            action: this.handleSubmit,
            className: "btn btn-danger",
          },
        ]}
      >
        <Row className="align-items-center">
          <Col>
            <TextComponent
              label="Permission Name"
              placeHolder="Enter Permission Name"
              name="permissionName"
              required={false}
              type="text"
              controlId="permission_name"
            />
          </Col>
          <Col>
            <TextComponent
              label="Permission Slug"
              placeHolder="Enter Permission Slug"
              name="permissionSlug"
              required={false}
              type="text"
              controlId="permissionSlug"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectComponent
              label="Select Module"
              placeholder="Select Module"
              multiple={false}
              options={optionForModule}
              name="module"
            />
          </Col>
        </Row>
      </ModalComponent>
    );
  }
}
