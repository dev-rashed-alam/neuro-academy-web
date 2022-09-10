import React from "react";
import styled from "styled-components";
import {
    useTable,
    usePagination,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useRowSelect,
} from "react-table";
import {Card} from "react-bootstrap";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {MdFirstPage, MdLastPage} from "react-icons/md";
import {RiSearchEyeLine} from "react-icons/ri";

const Styles = styled.div`
  .table-wrapper {
    display: block;
    width: 100%;
    overflow:hidden;
    overflow-x: auto;
     -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  table {
    border-spacing: 0;
    width: 100% !important;
    color: #c3cbe4;
    font-family: "Poppins", sans-serif;
    font-size: 0.8125rem;
    line-height: 1.5;
    white-space: nowrap;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      th {
        border-top: 1px solid #32394e;
        background-color: #32394e;
        font-weight: 600 !important;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.75rem;
      border-bottom: 1px solid #32394e;
      line-height: 1.5;
      font-weight: 400;
    }
  }

  .pagination {
    padding: 0.5rem;
    float: right;
    
    svg{
        cursor: pointer;
    }

    span {
      padding: 7px 20px 5px;
      line-height: 1.5;
      font-weight: 400;
      color: #c3cbe4;
      font-family: "Poppins", sans-serif;
      font-size: 0.8125rem;
    }

    button {
      border: none;
      background-color: transparent;
      color: #fff;
      font-size: 1.3rem;
      outline: none;
    }
  }

  .search {
    padding: 1rem 0;
    float: right;
    clear: both;
    overflow: hidden;

    .input-group {
      border-bottom: 1px solid #fff !important;
      width: auto;

      .input-group-text {
        background-color: transparent;
        border: none;
        padding: 0 10px 0 0;
      }
    }

    input {
      border: none;
      height: 36px;
      padding-left: 0;
      background-color: #2a3042;
      box-shadow: none;
      color: #c3cbe4 !important;
      font-family: "Poppins", sans-serif !important;
      font-size: 0.8125rem !important;
      line-height: 1.5 !important;
      font-weight: 400 !important;
    }
  }

  .custom-checkbox {
    text-align: center;
    padding-left: 0.5rem !important;
  }

  .custom-control-label::after,
  .custom-control-label::before {
    position: absolute;
    top: 0.10938rem;
    left: -0.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    box-shadow: none !important;
    outline: none !important;
    border: none !important;
  }

  .custom-control-label::before {
    pointer-events: none;
    background-color: #2e3548;
    border: 1px solid #32394e;
  }

  .custom-checkbox .custom-control-label::before {
    border-radius: 0.25rem;
  }

  .custom-control-label::before,
  .custom-file-label,
  .custom-select {
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

function GlobalFilter({
                          preGlobalFilteredRows,
                          globalFilter,
                          setGlobalFilter,
                      }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className="input-group">
            <div className="input-group-prepend">
        <span className="input-group-text" id="search">
          <RiSearchEyeLine/>
        </span>
            </div>
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </div>
    );
}

const IndeterminateCheckbox = React.forwardRef(
    ({indeterminate, ...rest}, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <div className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    ref={resolvedRef}
                    {...rest}
                />
                <label className="custom-control-label" htmlFor={`${rest.id}`}>
                    &nbsp;
                </label>
            </div>
        );
    }
);

function Table({columns, data, selection, paginationUtil, triggerPagination}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect,
        (hooks) => {
            if (selection === true) {
                hooks.visibleColumns.push((columns) => [
                    {
                        id: "selection",
                        Header: ({getToggleAllRowsSelectedProps}) => (
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                                id={`customCheck`}
                            />
                        ),
                        Cell: ({row}) => (
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                                id={`customCheck${parseInt(row.id) + 1}`}
                            />
                        ),
                    },
                    ...columns,
                ]);
            } else {
                hooks.visibleColumns.push((columns) => [...columns]);
            }
        }
    );
    console.log(state.selectedRowIds);
    return (
        <>
            <div className="search">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <div className="table-wrapper">
                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            {(paginationUtil !== undefined) && (
                <div className="pagination">
          <span>
            Page{" "}
              <strong>
              {paginationUtil.currentPage || 0} of {paginationUtil.totalPage || 0}
            </strong>
          </span>
                    <button onClick={() => triggerPagination(paginationUtil.firstPageUrl)}
                            disabled={!paginationUtil.firstPageUrl}>
                        <MdFirstPage/>
                    </button>
                    <button onClick={() => triggerPagination(paginationUtil.previousPageUrl)}
                            disabled={!paginationUtil.previousPageUrl}>
                        <FiChevronLeft/>
                    </button>
                    <button onClick={() => triggerPagination(paginationUtil.nextPageUrl)}
                            disabled={!paginationUtil.nextPageUrl}>
                        <FiChevronRight/>
                    </button>
                    <button
                        onClick={() => triggerPagination(paginationUtil.lastPageUrl)}
                        disabled={!paginationUtil.lastPageUrl}
                    >
                        <MdLastPage/>
                    </button>
                </div>
            )}
        </>
    );
}

function TableComponent({tableColumn, tableData, selection, pagination, paginationUtil, triggerPagination}) {
    const columns = React.useMemo(() => tableColumn, [tableColumn]);

    const data = React.useMemo(() => tableData, [tableData]);

    return (
        <Card>
            <Card.Body>
                <Styles>
                    <Table
                        columns={columns}
                        data={data}
                        selection={selection}
                        pagination={pagination}
                        paginationUtil={paginationUtil}
                        triggerPagination={triggerPagination}
                    />
                </Styles>
            </Card.Body>
        </Card>
    );
}

export default TableComponent;
