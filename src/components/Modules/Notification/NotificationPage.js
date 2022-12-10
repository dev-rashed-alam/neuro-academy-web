import React, { useContext, useEffect } from "react";
import NotificationList from "./NotificationList";
import { FormContext } from "../../Context/FormContext";
import "../../../assets/styles/Notification.scss";

const NotificationPage = () => {
  const { setLoader } = useContext(FormContext);

  useEffect(() => {
    setLoader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notification-page">
      <NotificationList />
    </div>
  );
};

export default NotificationPage;
