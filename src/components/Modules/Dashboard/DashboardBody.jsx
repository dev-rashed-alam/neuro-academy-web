import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Card as CustomCard } from "../../CommonComponents/Card";
import TableComponent from "../../CommonComponents/Table/Table";
import LineChart from "../../CommonComponents/Chart/LineChart";
import BarChart from "../../CommonComponents/Chart/BarChart";

const tableColumn = [
  {
    Header: "Order Id",
    accessor: "orderId",
  },
  {
    Header: "Billing Name",
    accessor: "billingName",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Total",
    accessor: "total",
  },
  {
    Header: "Payment Status",
    accessor: "paymentStatus",
  },
  {
    Header: "Payment Method",
    accessor: "paymentMethod",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const tableData = [
  {
    orderId: "#SK225",
    billingName: "Rashed Alam",
    date: "07 Oct, 2019",
    total: "$500",
    paymentStatus: "Paid",
    paymentMethod: "COD",
    action: "View",
  },
  {
    orderId: "#SK224",
    billingName: "Rashed Alam",
    date: "07 Oct, 2019",
    total: "$500",
    paymentStatus: "Paid",
    paymentMethod: "COD",
    action: "View",
  },
];

export default class DashboardBody extends Component {
  render() {
    return (
      <>
        <Row>
          <Col xs={6} sm={6} md={3}>
            <CustomCard value="$123000" name="All Time Sales" />
          </Col>
          <Col xs={6} sm={6} md={3}>
            <CustomCard value="1,287" name="Total Purchases" />
          </Col>
          <Col xs={6} sm={6} md={3}>
            <CustomCard value="1214" name="Total Students" />
          </Col>
          <Col xs={6} sm={6} md={3}>
            <CustomCard value="50" name="Total Courses" />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className="mt-3 mb-5">
            <Card>
              <Card.Body>
                <h3 className="text-center">Sales Report</h3>
                <LineChart />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className="mt-3 mb-5">
            <Card>
              <Card.Body className="pb-1">
                <div className="text-center chart-details">
                  <p>Total Revenue of the year</p>
                  <h3>$80,940</h3>
                </div>
                <BarChart />
              </Card.Body>
            </Card>
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
      </>
    );
  }
}
