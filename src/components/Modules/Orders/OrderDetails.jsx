import React from "react";
import "../../../assets/styles/OrderDetails.scss";
import { FaFreeCodeCamp } from "react-icons/fa";

const OrderDetails = ({ id }) => {
  return (
    <>
      <div className="order-details">
        <div className>
          <div className="order-details-header">
            <h1 className="uppercase">
              Invoice
              <p className="text-gray-500">
                Status:{" "}
                <span className="capitalize">
                  <span>
                    <span>Pending</span>
                  </span>
                </span>
              </p>
            </h1>
            <div className="text-right">
              <h2 className="order-icons">
                <FaFreeCodeCamp />
                &nbsp; E-Academy
              </h2>
              <p className="order-address">
                Cecilia Chapman, 561-4535 Nulla LA, <br /> United States 96522{" "}
              </p>
            </div>
          </div>
          <div className="order-cards">
            <div className="flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                Date
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 block">
                <span>December 15, 2022</span>
              </span>
            </div>
            <div className="flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                Invoice No
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 block">
                #10012
              </span>
            </div>
            <div className="flex-col text-right">
              <span className="text-gray-500">Invoice To.</span>
              <span>
                Dalton Mclaughlin
                <br />
                Est occaecat ut tene
                <br />
                Ut et voluptatum odi, Molestiae aliquam ma, 98376
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
                    <td className="px-4 py-3"> Sr.</td>
                    <td className="px-4 py-3">Product Name</td>
                    <td className="px-4 py-3 text-center">Quantity</td>
                    <td className="px-4 py-3 text-center">Item Price</td>
                    <td className="px-4 py-3 text-center">Amount</td>
                  </tr>
                </thead>
                <tbody className="order-table-body">
                  <tr>
                    <td className="px-4 py-3 px-6 py-1 text-left">1</td>
                    <td className="px-4 py-3 px-6 py-1">Clementine</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">1</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">$13.00</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">$13.00</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 px-6 py-1 text-left">1</td>
                    <td className="px-4 py-3 px-6 py-1">Clementine</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">1</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">$13.00</td>
                    <td className="px-4 py-3 px-6 py-1 text-center">$13.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="order-table-footer">
          <div className="flex">
            <div className="flex-col">
              <span>Payment Method</span>
              <span>COD</span>
            </div>
            <div className="flex-col">
              <span>Shipping Cost</span>
              <span>$60.00</span>
            </div>
            <div className="flex-col">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex-col">
              <span>Total Amount</span>
              <span>$102.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
