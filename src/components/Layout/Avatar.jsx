import React from "react";
import {Link} from "react-router-dom";
import {IoIosRedo} from "react-icons/io";
import {FiChevronDown} from "react-icons/fi";
import {FaUserCircle, FaRegEnvelopeOpen} from "react-icons/fa";
import AvatarImage from "../../assets/images/avatar.jpg";
import styled from "styled-components";

const Styles = styled.div`
  .header-profile-user {
    height: 36px;
    width: 36px;
    background-color: #32394e;
    padding: 3px;
  }
  .rounded-circle {
    border-radius: 50% !important;
  }

  .admin-name {
    font-size: 0.9rem;

    svg {
      margin-left: 5px;
    }
  }

  .nav-dropdown-body {
    height: auto !important;

    .wrapper {
      overflow: hidden !important;

      .media {
        padding: 0.5rem 1rem !important;
      }

      .avatar-title {
        background-color: transparent !important;
        border-radius: 0 !important;
      }

      .media-body {
        padding-top: 10px;
      }
    }
  }
`;

const Avatar = (props) => {
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
          <img
              className="rounded-circle header-profile-user"
              src={AvatarImage}
              alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1 admin-name">
            admin
            <FiChevronDown/>
          </span>
        </span>
                <div
                    className="nav-dropdown-hover"
                    onMouseLeave={() => props.hoverOpen(props.stateName)}
                >
                    <div className="nav-dropdown-body">
                        <div className="wrapper">
                            <Link to="/">
                                <div className="media">
                                    <div className="avatar">
                                        <div className="avatar-title">
                                            <FaUserCircle/>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <h6 className="mt-0 mb-1">Profile</h6>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/">
                                <div className="media">
                                    <div className="avatar">
                                        <div className="avatar-title">
                                            <FaRegEnvelopeOpen/>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <h6 className="mt-0 mb-1">Notification</h6>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/">
                                <div className="media">
                                    <div className="avatar">
                                        <div className="avatar-title">
                                            <IoIosRedo/>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <h6 className="mt-0 mb-1">Logout</h6>
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

export default Avatar;
