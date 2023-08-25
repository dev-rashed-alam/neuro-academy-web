import React, {useContext, useEffect, useState} from "react";
import "../../../assets/styles/OrderDetails.scss";
import {FaFreeCodeCamp} from "react-icons/fa";
import {FormContext} from "../../Context/FormContext";
import {findPurchaseInfoById} from "../../../services/Purchase";
import {useParams} from "react-router-dom";
import {formatDate} from "../../Config/HelperUtils";
import {getUserEmail} from "../../Config/SessionUtils";

const PurchaseDetails = () => {
    const [purchaseInfo, setPurchaseInfo] = useState(null)
    const {setLoader} = useContext(FormContext);
    const {id} = useParams()

    useEffect(() => {
        setLoader(true)
        findPurchaseInfoById(id).then(data => {
            setPurchaseInfo(data)
            setLoader(false)
        }).catch(() => setLoader(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderTableBody = () => {
        return purchaseInfo?.courses?.map((item, sl) => {
            return (
                <tr key={`course-${item.id}`}>
                    <td className="px-4 py-3 px-6 py-1 text-left">{sl+1}</td>
                    <td className="px-4 py-3 px-6 py-1">{item.title}</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">{item.instructorName}</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">${item.coursePrice}</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">{item.courseDuration}</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">{item.courseType}</td>
                </tr>
            )
        })
    }

    return (<>
        <div className="order-details">
            <div>
                <div className="order-details-header">
                    <h1 className="uppercase">
                        Invoice
                        <p className="text-gray-500">
                            Status: Completed
                        </p>
                    </h1>
                    <div className="text-right">
                        <h2 className="order-icons">
                            <FaFreeCodeCamp/>
                            &nbsp; E-Academy
                        </h2>
                        <p className="order-address">
                            {getUserEmail()}
                        </p>
                    </div>
                </div>
                <div className="order-cards">
                    <div className="flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                Date
              </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                <span>{formatDate(purchaseInfo?.createdAt)}</span>
              </span>
                    </div>
                    <div className="flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                    Invoice No
              </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                    {purchaseInfo?.invoiceNumber}
              </span>
                    </div>
                    <div className="flex-col text-right">
                        <span className="text-gray-500">Invoice To.</span>
                        <span>
                            {purchaseInfo?.student?.firstName + " " + purchaseInfo?.student?.lastName}
                            <br/>
                            {purchaseInfo?.student?.email}
                            <br/>
                            {purchaseInfo?.student?.phoneNumber}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className="order-table">
                    <div className="w-full">
                        <table className="w-full whitespace-no-wrap">
                            <thead className="order-table-head">
                            <tr>
                                <td className="px-4 py-3">SL</td>
                                <td className="px-4 py-3">Course Title</td>
                                <td className="px-4 py-3 text-center">Instructor Name</td>
                                <td className="px-4 py-3 text-center">Course Price</td>
                                <td className="px-4 py-3 text-center">Course Duration</td>
                                <td className="px-4 py-3 text-center">Course Type</td>
                            </tr>
                            </thead>
                            <tbody className="order-table-body">
                            {renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="order-table-footer">
                <div className="flex">
                    <div className="flex-col">
                        <span>Payment Method</span>
                        <span>{purchaseInfo?.paymentMethod}</span>
                    </div>
                    <div className="flex-col">
                        <span>Total Course</span>
                        <span>{purchaseInfo?.courses?.length}</span>
                    </div>
                    <div className="flex-col">
                        <span>Total Amount</span>
                        <span>${purchaseInfo?.totalPrice}</span>
                    </div>
                    <div className="flex-col">
                        <span>Purchase Amount</span>
                        <span>${purchaseInfo?.purchasePrice}</span>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default PurchaseDetails;
