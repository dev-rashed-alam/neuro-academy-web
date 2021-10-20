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
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Permissions",
    accessor: "permissions",
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];

const tableData = [
  {
    sl: 1,
    name: "Rashed ALam",
    role: "Admin",
    permissions: "Admin",
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
            <h3>This is User List</h3>
          </Col>
          <Col>
            <Button
              icon={<MdAddCircle />}
              name="New User"
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
