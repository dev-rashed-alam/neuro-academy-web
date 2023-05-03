import React from "react";
import PropTypes from "prop-types";

export const Button = ({ name, icon, className, onClickEvent, type = "button" }) => {
  return (
    <button type={type} className={className || ""} onClick={onClickEvent}>
      {icon}
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClickEvent: PropTypes.func,
};
