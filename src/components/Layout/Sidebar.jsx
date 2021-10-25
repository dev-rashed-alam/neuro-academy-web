import React, {Component} from "react";
import {FaAngleDown, FaUserGraduate, FaCodepen, FaUsers, FaDatabase, FaBookReader} from "react-icons/fa";
import {MdDashboard} from "react-icons/md";
import {GiPaintBucket} from "react-icons/gi";
import {NavLink} from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            windowWidth: window.innerWidth,
            navItemOne: false,
            navItemTwo: false,
            navItemThree: false,
            isHoverItemOne: false,
            isHoverItemTwo: false,
            isHoverItemFive: false,
            isHoverItemSix: false,
            isHoverItemSeven: false,
        };
    }

    updateDimensions = () => {
        this.setState({windowWidth: window.innerWidth});
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    collapseAbleItem = (itemName) => {
        if (this.props.toggle === false || this.state.windowWidth < 992) {
            let initState = this.initialState;
            delete initState[itemName];
            this.setState(initState);
            this.setState((prevState) => ({
                [itemName]: !prevState[itemName],
            }));
        } else {
            return false;
        }
    };

    navItemHover = (itemName) => {
        if (this.props.toggle === true && this.state.windowWidth > 992) {
            let initState = this.initialState;
            delete initState[itemName];
            this.setState(initState);
            this.setState((prevState) => {
                return {
                    [itemName]: !prevState[itemName],
                };
            });
        }
    };

    renderSingleMenu = (path, icon, menuName, hoverState, active) => {
        return (
            <li
                className={`${this.state[hoverState] ? "nav-item hover-open" : "nav-item"
                }`}
                onMouseEnter={() => this.navItemHover(hoverState)}
                onMouseLeave={() => this.navItemHover(hoverState)}
            >
                <NavLink className="nav-link " exact to={path} activeClassName="active">
                    <span className="menu-icon">{icon}</span>
                    <span className="menu-title">{menuName}</span>
                </NavLink>
            </li>
        );
    };

    renderCollapseAbleMenu = (
        icon,
        menuName,
        hoverState,
        navState,
        childMenu
    ) => {
        return (
            <li
                className={this.state[hoverState] ? "nav-item hover-open" : "nav-item"}
                onMouseEnter={() => this.navItemHover(hoverState)}
                onMouseLeave={() => this.navItemHover(hoverState)}
            >
                <p
                    className="nav-link"
                    onClick={() => this.collapseAbleItem(navState)}
                    aria-expanded={this.state[navState]}
                    style={{userSelect: "none"}}
                >
                    <span className="menu-icon">{icon}</span>
                    <span className="menu-title">{menuName}</span>
                    <span className="menu-arrow">
            <FaAngleDown/>
          </span>
                </p>
                <div className={this.state[navState] ? "collapse show" : "collapse"}>
                    <ul className="nav flex-column sub-menu">
                        <li className="nav-item">
                            {childMenu.map((menu) => {
                                return (
                                    <NavLink className="nav-link" exact to={menu.link}>
                                        {menu.name}
                                    </NavLink>
                                );
                            })}
                        </li>
                    </ul>
                </div>
            </li>
        );
    };

    renderMenuList = () => {
        return (
            <>
                {this.renderSingleMenu(
                    "/dashboard",
                    <MdDashboard/>,
                    "Dashboard",
                    "isHoverItemOne",
                    "active"
                )}
                {this.renderSingleMenu(
                    "/courses",
                    <FaUserGraduate/>,
                    "Course Management",
                    "isHoverItemTwo"
                )}
                {this.renderSingleMenu(
                    "/students",
                    <FaUsers/>,
                    "Student Management",
                    "isHoverItemThree"
                )}
                {this.renderSingleMenu(
                    "/sales",
                    <GiPaintBucket/>,
                    "Order Management",
                    "isHoverItemFour"
                )}
                {this.renderSingleMenu(
                    "/categories",
                    <FaBookReader/>,
                    "Category Management",
                    "isHoverItemFive"
                )}
                {this.renderSingleMenu(
                    "/coupons",
                    <FaCodepen/>,
                    "Coupon Management",
                    "isHoverItemSix"
                )}
                {this.renderSingleMenu(
                    "/",
                    <FaDatabase/>,
                    "Report Generate",
                    "isHoverItemSeven"
                )}
            </>
        );
    };

    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">{this.renderMenuList()}</ul>
            </nav>
        );
    }
}

export default Sidebar;
