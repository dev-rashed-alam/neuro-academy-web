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
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Slug",
    accessor: "slug",
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
    role: "Admin",
    slug: "admin",
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
            <h3>This is Role List</h3>
          </Col>
          <Col>
            <Button
              icon={<MdAddCircle />}
              name="New Role"
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
