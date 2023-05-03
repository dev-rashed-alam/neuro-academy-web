import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NotificationList from "../Modules/Notification/NotificationList";

const Styles = styled.div`
  .menu-icon {
    svg {
      margin-top: 8px;
    }
  }
`;

const DashboardNotification = (props) => {
  return (
    <Styles>
      <li
        className={
          props.stateValue
            ? "navbar-dropdown hover-content-show"
            : "navbar-dropdown"
        }
        onClick={() => props.hoverOpen(props.stateName)}
      >
        <span className="menu-icon">
          {props.icon}
          <span className="badge badge-danger badge-pill">&nbsp;</span>
        </span>
        <div
          className="nav-dropdown-hover"
          onMouseLeave={() => props.hoverOpen(props.stateName)}
        >
          <div className="p-3">
            <div className="align-items-center row">
              <div className="col">
                <h6 className="m-0"> {props.title} </h6>
              </div>
              <div className="col-auto">
                <Link to="/notifications">View All</Link>
              </div>
            </div>
          </div>
          <div className="nav-dropdown-body">
            {/*<NotificationList />*/}
          </div>
        </div>
      </li>
    </Styles>
  );
};

export default DashboardNotification;
