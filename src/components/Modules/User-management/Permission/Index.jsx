import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import TableComponent from "../../../CommonComponents/Table/Table";
import { Button } from "../../../CommonComponents/Button";
import { Form } from "./Form";
const tableColumn = [
  {
    Header: "SL",
    accessor: "sl",
  },
  {
    Header: "Module Name",
    accessor: "moduleName",
  },
  {
    Header: "Module Permission",
    accessor: "modulePermission",
  },
  {
    Header: "Assigned Roles",
    accessor: "assignedRoles",
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];

const tableData = [
  {
    sl: 1,
    moduleName: "User Management",
    modulePermission: "Create",
    assignedRoles: "Admin",
    actions: "Action",
  },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  triggerModal = () => {
    this.setState((prevState) => {
      return {
        modalShow: !prevState.modalShow,
      };
    });
  };

  render() {
    return (
      <>
        <Row className="p-20">
          <Col>
            <h3>This is Permission List</h3>
          </Col>
          <Col>
            <Button
              icon={<MdAddCircle />}
              name="New Permission"
              className="btn btn-primary float-right"
              onClickEvent={this.triggerModal}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TableComponent
              tableColumn={tableColumn}
              tableData={tableData}
              selection={true}
              pagination={true}
            />
          </Col>
        </Row>
        <Form
          modalShow={this.state.modalShow}
          triggerModal={this.triggerModal}
        />
      </>
    );
  }
}

export default Index;
