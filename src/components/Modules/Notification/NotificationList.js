import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import { fetchNotifications } from "../../../services/Notifications";
import { printApiErrors } from "../../Config/HelperUtils";
import { FormContext } from "../../Context/FormContext";
import moment from "moment";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const { setLoader } = useContext(FormContext);

  useEffect(() => {
    fetchNotifications()
      .then(({ data }) => {
        setNotifications(data.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        printApiErrors(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNotifications = () => {
    return notifications?.map((item) => {
      console.log(item);
      return (
        <Link to="/" key={`notification_${item.item_id}`}>
          <div className="media">
            <div className="avatar">
              <div className="avatar-title">
                <IoMdCart />
              </div>
            </div>
            <div className="media-body">
              <h6 className="mt-0 mb-1">{item.data.title}</h6>
              <div className="font-size-12 text-muted">
                <p className="mb-1">{item.data.message}</p>
                <p className="mb-0">
                  <FiClock /> {moment(item.created_at).fromNow()} ago
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return <div className="wrapper">{renderNotifications()}</div>;
};

export default NotificationList;
