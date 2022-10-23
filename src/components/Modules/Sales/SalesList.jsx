import React from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";

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
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Course Title",
    accessor: "courseTitle",
  },
  {
    Header: "Purchase Date",
    accessor: "purchaseDate",
  },
  {
    Header: "Purchase Amount",
    accessor: "purchaseAmount",
  },
  {
    Header: "View Details",
    accessor: "details",
  },
];

const tableData = [
  {
    sl: 1,
    name: "Rashed Alam",
    email: "dev.rashedalam@gmail.com",
    courseTitle: "Graphics Design",
    purchaseDate: "10/07/2021",
    purchaseAmount: "$30",
    details: "View",
  },
];

const SalesList = () => {
  return (
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
  );
};

export default SalesList;
