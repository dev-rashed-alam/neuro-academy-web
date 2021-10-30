import React, { useState, useEffect, useContext } from "react";
import "../../../assets/styles/Form.scss";
import { Form } from "react-bootstrap";
import { FormContext } from "../../Context/FormContext";

const TextComponent = ({
  label,
  name,
  required,
  type,
  placeHolder,
  controlId,
  readOnly,
  value,
  handleBlur,
}) => {
  const { handleChange } = useContext(FormContext);

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="form-style"
        type={type}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        readOnly={readOnly}
      />
    </Form.Group>
  );
};

export default TextComponent;
