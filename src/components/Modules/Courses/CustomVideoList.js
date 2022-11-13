import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";

const tableColumn = [
  {
    Header: "SL",
    accessor: "sl",
  },
  {
    Header: "Video Title",
    accessor: "videoTitle",
  },
  {
    Header: "Uploaded Date",
    accessor: "uploadedDate",
  },
  {
    Header: "Remove",
    accessor: "action",
  },
];

const CustomVideoList = ({ courseInfo }) => {
  const [tableData] = useState([]);

  return (
    <Row>
      <Col>
        {courseInfo?.courseType === "custom" && courseInfo?.id && (
          <TableComponent
            tableColumn={tableColumn}
            tableData={tableData}
            selection={false}
            pagination={true}
          />
        )}
      </Col>
    </Row>
  );
};

export default CustomVideoList;
