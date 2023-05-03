import React from "react";
import PropTypes from "prop-types";
import styles from "../../assets/styles/Card.module.scss";

export const Card = ({ value, name }) => {
  return (
    <div className={`card ${styles.card}`}>
      <div className={`card-body ${styles.cardBody}`}>
        <div>
          <h4>{value}</h4>
          <small>{name}</small>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
