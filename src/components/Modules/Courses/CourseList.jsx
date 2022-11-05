import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CourseForm from "./CourseForm";
import { Button } from "../../CommonComponents/Button";
import { MdAddCircle } from "react-icons/md";
import { FormContext } from "../../Context/FormContext";
import { apiUrl, getMethod, postMethod } from "../../Config/ApiHandler";
import {
  formatDate,
  generatePagination,
  printApiErrors,
} from "../../Config/HelperUtils";
import { toast } from "react-toastify";

const tableColumn = [
  {
    Header: "SL",
    accessor: "sl",
  },
  {
    Header: "Course Title",
    accessor: "courseTitle",
  },
  {
    Header: "Instructor Name",
    accessor: "instructorName",
  },
  {
    Header: "Published Date",
    accessor: "publishDate",
  },
  {
    Header: "Course Duration",
    accessor: "courseDuration",
  },
  {
    Header: "Total Videos",
    accessor: "totalVideos",
  },
  {
    Header: "Number of Students",
    accessor: "numberOfStudents",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Update",
    accessor: "action",
  },
];

const CourseList = () => {
  const { setLoader } = useContext(FormContext);
  const [modal, setModal] = useState(false);
  const [, setPaginationUtil] = useState({});
  const [tableData, setTableDta] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});

  useEffect(() => {
    fetchCourseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModalForUpdate = (item) => {
    setSelectedCourse(item);
    setModal(true);
  };

  const renderUpdateButton = (item) => {
    return (
      <Button
        name="Update"
        className="btn btn-danger btn-sm"
        onClickEvent={() => openModalForUpdate(item)}
      />
    );
  };

  const toggleCourseStatus = async (status, id) => {
    setLoader(true);
    let postData = {};
    postData.status = status === 0 ? 1 : 0;
    await postMethod("/admin/courses/" + id + "/toggle-status", postData)
      .then(async (response) => {
        if (response.data.success === true) {
          await fetchCourseList();
        }
        setLoader(false);
        toast.success("Status Update Successful!");
      })
      .catch((error) => {
        setLoader(false);
        printApiErrors(error);
      });
  };

  const renderStatusButton = (statusFlag, id) => {
    return (
      <Button
        name={statusFlag === 1 ? "Enable" : "Disable"}
        className="btn btn-danger btn-sm"
        onClickEvent={() => toggleCourseStatus(statusFlag, id)}
      />
    );
  };

  const fetchCourseList = () => {
    setLoader(true);
    getMethod(apiUrl.courseList)
      .then((response) => {
        let resultSet = [];
        let sl = 1;
        for (let item of response.data.data) {
          resultSet.push({
            sl: sl++,
            courseTitle: item.title,
            instructorName: item.instructor_name,
            publishDate: formatDate(item.created_at),
            courseDuration: item.course_duration,
            totalVideos: item.videos.length,
            courseTile: item.title,
            numberOfStudents: item.purchase_count,
            status: renderStatusButton(item.status, item.id),
            action: renderUpdateButton(item),
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

  const closeModal = () => {
    setSelectedCourse({});
    setModal(!modal);
  };

  return (
    <>
      <Row className="p-20">
        <Col>
          <h3>Course Summary</h3>
        </Col>
        <Col>
          <Button
            icon={<MdAddCircle />}
            name="Add New Course"
            className="btn btn-primary float-right"
            onClickEvent={() => setModal(!modal)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TableComponent
            tableColumn={tableColumn}
            tableData={tableData}
            selection={false}
            pagination={true}
          />
        </Col>
      </Row>
      <CourseForm
        modalShow={modal}
        triggerModal={closeModal}
        fetchCourseList={fetchCourseList}
        selectedCourse={
          Object.keys(selectedCourse).length > 0 ? selectedCourse : undefined
        }
      />
    </>
  );
};

export default CourseList;
