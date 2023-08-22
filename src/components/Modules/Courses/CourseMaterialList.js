import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import {formatDate, printApiErrors} from "../../Config/HelperUtils";
import {Button} from "../../CommonComponents/Button";
import {FormContext} from "../../Context/FormContext";
import {removeCustomVideoById, removeMaterialById} from "../../../services/Course";
import {toast} from "react-toastify";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Material Title",
        accessor: "materialTitle",
    },
    {
        Header: "Material Url",
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

const CourseMaterialList = ({selectedCourse}) => {
    const [tableData, setTableData] = useState([]);
    const [courseInfo, setCourseInfo] = useState({});
    const {setLoader} = useContext(FormContext);

    useEffect(() => {
        setCourseInfo(selectedCourse);
    }, [selectedCourse]);

    const handleRemove = (filename, materialType) => {
        setLoader(true);
        removeMaterialById(courseInfo.id, {filename, materialType})
            .then((response) => {
                let tmpCourseInfo = JSON.parse(JSON.stringify(courseInfo));
                tmpCourseInfo.materials[materialType] = courseInfo.materials[materialType].filter(
                    (item) => item.filename !== filename
                );
                setCourseInfo(tmpCourseInfo);
                toast.success("Material Removed!");
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
                printApiErrors(error);
            });
    };

    const renderRemoveButton = (fileName, materialType) => {
        return (
            <Button
                name="Remove"
                className="btn btn-danger btn-sm"
                onClickEvent={() => handleRemove(fileName, materialType)}
            />
        );
    };

    useEffect(() => {
        let resultSet = [];
        if (courseInfo?.materials?.images?.length > 0) {
            let sl = 1;
            for (let item of courseInfo.materials.images) {
                resultSet.push({
                    sl: sl++,
                    materialTitle: item.title,
                    url: item.url,
                    uploadedDate: formatDate(item.uploadDate),
                    action: renderRemoveButton(item.filename, 'images'),
                    materialType: 'images'
                });
            }
        }
        if (courseInfo?.materials?.attachments?.length > 0) {
            let sl = 1;
            for (let item of courseInfo.materials.attachments) {
                resultSet.push({
                    sl: sl++,
                    materialTitle: item.title,
                    url: item.url,
                    uploadedDate: formatDate(item.uploadDate),
                    action: renderRemoveButton(item.filename, 'attachments'),
                    materialType: 'attachments'
                });
            }
        }
        setTableData(resultSet);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseInfo]);

    return (
        <Row>
            <Col className={"custom-video-list"}>
                {courseInfo?.id !== null &&
                    tableData?.length > 0 && (
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

export default CourseMaterialList;
