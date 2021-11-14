import React from "react";
import 'antd-notifications-messages/lib/styles/index.css';
import {notification} from 'antd-notifications-messages';

const Notification = ({alert, type, title, description, duration}) => {
    if (alert) {
        return notification({
            type,
            title: title,
            message: description,
        })
    } else {
        return "";
    }
}

export default Notification