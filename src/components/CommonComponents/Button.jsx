import React from "react";
import PropTypes from "prop-types";

export const Button = ({ name, icon, className, onClickEvent }) => {
  let s = "";
  s = className;
  console.log(s)
  return (
    <button type="button" className={s} onClick={onClickEvent}>
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
