import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import { getMethod, postMethod } from "../../Config/ApiHandler";
import { generatePagination, printApiErrors } from "../../Config/HelperUtils";
import { FormContext } from "../../Context/FormContext";
import { Button } from "../../CommonComponents/Button";
import { toast } from "react-toastify";

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
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
  },
  {
    Header: "View Details",
    accessor: "details",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const StudentList = () => {
  const [paginationUtil, setPaginationUtil] = useState({});
  const [tableData, setTableDta] = useState([]);
  const { setLoader } = useContext(FormContext);
  const [studentListUrl, setStudentListUrl] = useState("/admin/students");

  useEffect(() => {
    fetchStudentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentListUrl]);

  const fetchStudentList = () => {
    setLoader(true);
    getMethod(studentListUrl)
      .then((response) => {
        let resultSet = [];
        let sl = 1;
        for (let item of response.data.data) {
          resultSet.push({
            sl: sl++,
            name: `${item.first_name} ${item.last_name}`,
            email: item.email,
            phoneNumber: item.phone_no,
            gender: item.gender,
            status: renderStatusButton(item.status, item.id),
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

  const renderStatusButton = (statusFlag, id) => {
    return (
      <Button
        name={statusFlag === 1 ? "Enable" : "Disable"}
        className="btn btn-danger btn-sm"
        onClickEvent={() => toggleStudentStatus(statusFlag, id)}
      />
    );
  };

  const toggleStudentStatus = async (status, id) => {
    setLoader(true);
    let postData = {};
    postData.status = status === 0 ? 1 : 0;
    await postMethod("/admin/students/" + id + "/toggle-status", postData)
      .then(async (response) => {
        if (response.data.success === true) {
          await fetchStudentList();
        }
        setLoader(false);
        toast.success("Status Update Successful!");
      })
      .catch((error) => {
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
          triggerPagination={setStudentListUrl}
          paginationUtil={paginationUtil}
        />
      </Col>
    </Row>
  );
};

export default StudentList;
