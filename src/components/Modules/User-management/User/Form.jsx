import React, { Component } from "react";
import { ModalComponent } from "../../../CommonComponents/ModalComponent";
import { Col, Row } from "react-bootstrap";
import TextComponent from "../../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../../CommonComponents/Form/SelectComponent";

const optionForRole = [
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
        title="Add New User"
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
              label="User Name"
              placeHolder="Enter User Name"
              name="userName"
              required={false}
              type="text"
              controlId="userName"
            />
          </Col>
          <Col>
            <TextComponent
              label="Email"
              placeHolder="Enter Email"
              name="email"
              required={false}
              type="text"
              controlId="email"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextComponent
              label="Password"
              placeHolder="Enter Password"
              name="password"
              required={false}
              type="text"
              controlId="password"
            />
          </Col>
          <Col>
            <TextComponent
              label="Confirm Password"
              placeHolder="Enter Confirm Password"
              name="confirmPassword"
              required={false}
              type="text"
              controlId="confirmPassword"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectComponent
              label="Select Role"
              placeholder="Select Role"
              multiple={false}
              options={optionForRole}
              name="role"
            />
          </Col>
          <Col>
            <SelectComponent
              label="Select Permission"
              placeholder="Select Permission"
              multiple={true}
              options={optionForRole}
              name="permission"
            />
          </Col>
        </Row>
      </ModalComponent>
    );
  }
}
