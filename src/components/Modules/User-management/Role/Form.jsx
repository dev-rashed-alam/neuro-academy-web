import React, { Component } from "react";
import { ModalComponent } from "../../../CommonComponents/ModalComponent";
import { Col, Row } from "react-bootstrap";
import TextComponent from "../../../CommonComponents/Form/TextComponent";

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
        title="Add New Role"
        scrollable={true}
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
              label="Role Name"
              placeHolder="Enter Role Name"
              name="roleName"
              required={false}
              type="text"
              controlId="roleName"
            />
          </Col>
          <Col>
            <TextComponent
              label="Role Slug"
              placeHolder="Enter Role Slug"
              name="roleSlug"
              required={false}
              type="text"
              controlId="roleSlug"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextComponent
              label="Add Permissions"
              placeHolder="Enter Permissions"
              name="rolePermission"
              required={false}
              type="text"
              controlId="rolePermission"
            />
          </Col>
        </Row>
      </ModalComponent>
    );
  }
}
