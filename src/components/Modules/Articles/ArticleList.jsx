import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TableComponent from "../../CommonComponents/Table/Table";
import ArticleForm from "./ArticleForm";
import { Button } from "../../CommonComponents/Button";
import { MdAddCircle } from "react-icons/md";
import { FormContext } from "../../Context/FormContext";
import { getMethod } from "../../Config/ApiHandler";
import {
  formatDate,
  generatePagination,
  printApiErrors,
} from "../../Config/HelperUtils";
import {findAllArticles} from "../../../services/Article";
import {findAllCategories} from "../../../services/Category";

const tableColumn = [
  {
    Header: "SL",
    accessor: "sl",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Created Date",
    accessor: "createdDate",
  },
  {
    Header: "Total Views",
    accessor: "totalViews",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const ArticleList = () => {
  const [modal, setModal] = useState(false);
  const [tableData, setTableDta] = useState([]);
  const { setLoader, resetContext } = useContext(FormContext);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    setLoader(true);
    let resultSet = [];
    const data = await findAllCategories()
    let sl = 1;
    for (let item of data) {
      resultSet.push({
        sl: sl++,
        label: item.name,
        value: item.id,
      });
    }
    setCategoryList(resultSet);
    setLoader(false);
  };

  useEffect(() => {
    fetchArticleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticleList = async () => {
    setLoader(true);
    const data = await findAllArticles()
    await fetchCategoryList()
    let resultSet = [];
    let sl = 1;
    for (let item of data) {
      resultSet.push({
        sl: sl++,
        title: item.title,
        category: item.category.name,
        createdDate: formatDate(item.createdAt),
        totalViews: item.totalViews,
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
    setSelectedArticle(item);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedArticle({});
    resetContext();
    setModal(!modal);
  };

  return (
    <>
      <Row className="p-20">
        <Col>
          <h3>List of Articles</h3>
        </Col>
        <Col>
          <Button
            icon={<MdAddCircle />}
            name="Add New Article"
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
            pagination={false}
          />
        </Col>
      </Row>
      <ArticleForm
        modalShow={modal}
        selectedArticle={
          Object.keys(selectedArticle).length > 0 ? selectedArticle : undefined
        }
        fetchArticleList={fetchArticleList}
        triggerModal={closeModal}
        categoryList={categoryList}
      />
    </>
  );
};

export default ArticleList;
