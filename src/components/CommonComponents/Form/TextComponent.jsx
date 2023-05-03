import React, { useContext } from "react";
import "../../../assets/styles/Form.scss";
import { Form } from "react-bootstrap";
import { FormContext } from "../../Context/FormContext";
import { capitalizeFirstLetter } from "../../Config/HelperUtils";

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
  errors,
}) => {
  const { handleChange } = useContext(FormContext);

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={
          errors && Object.keys(errors).length > 0 && errors[name]
            ? "form-style field-error"
            : "form-style"
        }
        type={type}
        placeholder={placeHolder}
        name={name}
        value={value ? value : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        readOnly={readOnly}
      />
      {errors && Object.keys(errors).length > 0 && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {capitalizeFirstLetter(errors[name])}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextComponent;
