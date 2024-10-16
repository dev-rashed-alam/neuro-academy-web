import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import {Button} from "../../CommonComponents/Button";
import {toast} from "react-toastify";
import {FormContext} from "../../Context/FormContext";
import {formatDate} from "../../Config/HelperUtils";
import {findAllUsersByUserType, updateUserStatusById} from "../../../services/User";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Student Name",
        accessor: "studentName",
    },
    {
        Header: "Email Address",
        accessor: "email",
    },
    {
        Header: "Phone Number",
        accessor: "phoneNumber",
    },
    {
        Header: "Created Date",
        accessor: "createdDate",
    },
    {
        Header: "Status",
        accessor: "status",
    }
];

const UserList = () => {
    const [tableData, setTableDta] = useState([]);
    const {setLoader} = useContext(FormContext);

    useEffect(() => {
        fetchStudentList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchStudentList = async () => {
        setLoader(true);
        const data = await findAllUsersByUserType();
        let resultSet = [];
        let sl = 1;
        for (let item of data) {
            resultSet.push({
                sl: sl++,
                studentName: `${item.firstName} ${item.lastName}`,
                email: item.email,
                phoneNumber: item.phoneNumber,
                createdDate: formatDate(item.createdAt),
                status: renderStatusButton(item)
            });
        }
        setTableDta(resultSet);
        setLoader(false);
    };

    const renderStatusButton = (category) => {
        return (
            <Button
                name={category.status === "enable" ? "Enable" : "Disable"}
                className={`btn ${category.status === 'enable' ? 'btn-primary' : 'btn-danger'} btn-sm`}
                onClickEvent={() => toggleCategoryStatus(category)}
            />
        );
    };

    const toggleCategoryStatus = async (category) => {
        setLoader(true);
        let postData = {...category};
        postData.status = category.status === "enable" ? "disable" : "enable";
        await updateUserStatusById(postData, category.id)
        await fetchStudentList();
        toast.success("Status Update Successful!");
        setLoader(false);
    };

    return (
        <>
            <Row>
                <Col>
                    <TableComponent
                        tableColumn={tableColumn}
                        tableData={tableData}
                        selection={false}
                    />
                </Col>
            </Row>
        </>
    );
};

export default UserList;
