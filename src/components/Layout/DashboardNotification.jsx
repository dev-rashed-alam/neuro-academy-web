import React from "react";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import styled from "styled-components";

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
                <Link to="/">View All</Link>
              </div>
            </div>
          </div>
          <div className="nav-dropdown-body">
            <div className="wrapper">
              <Link to="/">
                <div className="media">
                  <div className="avatar">
                    <div className="avatar-title">
                      <IoMdCart />
                    </div>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">Your order is placed</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p className="mb-0">
                        <FiClock /> 3 min ago{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/">
                <div className="media">
                  <div className="avatar">
                    <div className="avatar-title">
                      <IoMdCart />
                    </div>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">Your order is placed</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p className="mb-0">
                        <FiClock /> 3 min ago{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/">
                <div className="media">
                  <div className="avatar">
                    <div className="avatar-title">
                      <IoMdCart />
                    </div>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">Your order is placed</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p className="mb-0">
                        <FiClock /> 3 min ago
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </li>
    </Styles>
  );
};

export default DashboardNotification;
