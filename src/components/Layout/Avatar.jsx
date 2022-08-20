import React from "react";
import {IoIosRedo} from "react-icons/io";
import {FiChevronDown} from "react-icons/fi";
import {FaUserCircle, FaRegEnvelopeOpen} from "react-icons/fa";
import AvatarImage from "../../assets/images/avatar.jpg";
import styled from "styled-components";
import {postMethod} from "../Config/ApiHandler";
import {toast} from "react-toastify";
import {removeUserSession} from "../Config/SessionUtils";
import {useHistory} from "react-router-dom";

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

      .media-body button{
        background-color: transparent;
        border: none;
        padding-top: 4px;
        font-weight: bold;
        color: #d5cdcd;
      }
    }
  }
`;

const Avatar = (props) => {

    const history = useHistory();

    const logout = () => {
        postMethod("/admin/logout", {}).then(() => {
            removeUserSession();
            history.push('/');
            toast.success("Logout Successful!");
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

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
                            <div className="media">
                                <div className="avatar">
                                    <div className="avatar-title">
                                        <FaUserCircle/>
                                    </div>
                                </div>
                                <div className="media-body">
                                    <button className="mt-0 mb-1">Profile</button>
                                </div>
                            </div>
                            <div className="media">
                                <div className="avatar">
                                    <div className="avatar-title">
                                        <FaRegEnvelopeOpen/>
                                    </div>
                                </div>
                                <div className="media-body">
                                    <button className="mt-0 mb-1">Notification</button>
                                </div>
                            </div>
                            <div className="media">
                                <div className="avatar">
                                    <div className="avatar-title">
                                        <IoIosRedo/>
                                    </div>
                                </div>
                                <div className="media-body">
                                    <button onClick={logout} className="mt-0 mb-1">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </Styles>
    );
};

export default Avatar;
