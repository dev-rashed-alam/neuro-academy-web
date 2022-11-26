import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import { formatDate, printApiErrors } from "../../Config/HelperUtils";
import { Button } from "../../CommonComponents/Button";
import { FormContext } from "../../Context/FormContext";
import { removeCustomVideoById } from "../../../services/Course";
import { toast } from "react-toastify";

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
    Header: "Video Url",
    accessor: "url",
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

const CustomVideoList = ({ selectedCourse }) => {
  const [tableData, setTableData] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});
  const { setLoader } = useContext(FormContext);

  useEffect(() => {
    setCourseInfo(selectedCourse);
  }, [selectedCourse]);

  const handleRemove = (id) => {
    setLoader(true);
    removeCustomVideoById(id)
      .then((response) => {
        let tmpCourseInfo = JSON.parse(JSON.stringify(courseInfo));
        tmpCourseInfo.videos = courseInfo.videos.filter(
          (item) => item.id !== id
        );
        setCourseInfo(tmpCourseInfo);
        toast.success("Video Removed!");
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        printApiErrors(error);
      });
  };

  const renderRemoveButton = (id) => {
    return (
      <Button
        name="Remove"
        className="btn btn-danger btn-sm"
        onClickEvent={() => handleRemove(id)}
      />
    );
  };

  useEffect(() => {
    if (courseInfo?.videos?.length > 0) {
      let resultSet = [];
      for (let item of courseInfo.videos) {
        resultSet.push({
          sl: item.serial,
          videoTitle: item.title,
          url: item.video,
          uploadedDate: formatDate(item.created_at),
          action: renderRemoveButton(item.id),
        });
      }
      setTableData(resultSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseInfo]);

  return (
    <Row>
      <Col className={"custom-video-list"}>
        {courseInfo?.type === "custom" &&
          courseInfo?.id !== null &&
          courseInfo?.videos?.length > 0 && (
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
