import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import { FormContext } from "../../Context/FormContext";
import { getMethod } from "../../Config/ApiHandler";
import { generatePagination, printApiErrors } from "../../Config/HelperUtils";
import { Button } from "../../CommonComponents/Button";

const tableColumn = [
  {
    Header: "SL",
    accessor: "sl",
  },
  {
    Header: "Transaction Id",
    accessor: "transactionId",
  },
  {
    Header: "Gateway",
    accessor: "gateway",
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
    accessor: "action",
  },
];

const OrderList = () => {
  const [paginationUtil, setPaginationUtil] = useState({});
  const [tableData, setTableDta] = useState([]);
  const { setLoader } = useContext(FormContext);
  const [purchaseListUrl, setPurchaseListUrl] = useState("/admin/purchases");

  useEffect(() => {
    fetchPurchaseList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseListUrl]);

  const renderViewButton = (item) => {
    return <Button name="View" className="btn btn-primary btn-sm" />;
  };

  const fetchPurchaseList = () => {
    setLoader(true);
    getMethod(purchaseListUrl)
      .then((response) => {
        let resultSet = [];
        let sl = 1;
        for (let item of response.data.data) {
          resultSet.push({
            sl: sl++,
            transactionId: item.transaction_id,
            gateway: item.gateway,
            purchaseDate: item.purchase_date,
            purchaseAmount: item.total_price,
            name: `${item?.user?.first_name} ${item?.user?.last_name}`,
            email: item.user?.email,
            courseTitle: item.course?.title,
            action: renderViewButton(item),
          });
        }
        setTableDta(resultSet);
        setPaginationUtil(generatePagination(response.data));
        setLoader(false);
      })
      .catch((error) => {
        setTableDta([]);
        setLoader(false);
        printApiErrors(error);
      });
  };

  return (
    <Row>
      <Col>
        <TableComponent
          tableColumn={tableColumn}
          tableData={tableData}
          selection={false}
          pagination={true}
          triggerPagination={setPurchaseListUrl}
          paginationUtil={paginationUtil}
        />
      </Col>
    </Row>
  );
};

export default OrderList;
