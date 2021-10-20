import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { FormContext } from "../../Context/FormContext";

const RadioButtonComponent = ({
  label,
  controlId,
  name,
  value,
  required,
  readOnly,
  selectedValue,
}) => {
  const { handleChange } = useContext(FormContext);
  return (
    <Form.Check
      style={{ paddingTop: "20px" }}
      type="radio"
      name={name}
      label={label}
      inline={true}
      key={`inline-${controlId}`}
      value={value}
      checked={value}
      onChange={(e) =>
        handleChange({ target: { name: name, value: selectedValue } })
      }
      required={required}
      disabled={readOnly}
      id={`inline-${controlId}`}
    />
  );
};

export default RadioButtonComponent;
