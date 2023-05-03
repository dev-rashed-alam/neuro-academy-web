import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import CategoryForm from "./CategoryForm";
import {Button} from "../../CommonComponents/Button";
import {MdAddCircle} from "react-icons/md";
import {toast} from "react-toastify";
import {FormContext} from "../../Context/FormContext";
import {formatDate} from "../../Config/HelperUtils";
import {findAllCategories, updateCategoryById} from "../../../services/Category";

const tableColumn = [
    {
        Header: "SL",
        accessor: "sl",
    },
    {
        Header: "Category Name",
        accessor: "categoryName",
    },
    {
        Header: "Created Date",
        accessor: "createdDate",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const CategoryList = () => {
    const [modal, setModal] = useState(false);
    const [tableData, setTableDta] = useState([]);
    const {setLoader, resetContext} = useContext(FormContext);
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        fetchCategoryList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCategoryList = async () => {
        setLoader(true);
        const data = await findAllCategories();
        let resultSet = [];
        let sl = 1;
        for (let item of data) {
            resultSet.push({
                sl: sl++,
                categoryName: item.name,
                createdDate: formatDate(item.createdAt),
                status: renderStatusButton(item),
                action: renderUpdateButton(item),
            });
        }
        setTableDta(resultSet);
        setLoader(false);
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

    const openModalForUpdate = (item) => {
        setSelectedCategory(item);
        setModal(true);
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
        await updateCategoryById(postData, category.id)
        await fetchCategoryList();
        toast.success("Status Update Successful!");
        setLoader(false);
    };

    const closeModal = () => {
        setSelectedCategory({});
        resetContext();
        setModal(!modal);
    };

    return (
        <>
            <Row className="p-20">
                <Col>
                    <h3>List of Categories</h3>
                </Col>
                <Col>
                    <Button
                        icon={<MdAddCircle/>}
                        name="Add New Category"
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
                    />
                </Col>
            </Row>
            <CategoryForm
                modalShow={modal}
                selectedCategory={
                    Object.keys(selectedCategory).length > 0
                        ? selectedCategory
                        : undefined
                }
                fetchCategoryList={fetchCategoryList}
                triggerModal={closeModal}
            />
        </>
    );
};

export default CategoryList;
