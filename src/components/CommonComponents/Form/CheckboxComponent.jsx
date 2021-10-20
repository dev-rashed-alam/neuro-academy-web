import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { FormContext } from "../../Context/FormContext";
import "../../../assets/styles/Form.scss";

const CheckboxComponent = ({
  label,
  controlId,
  name,
  value,
  required,
  readOnly,
}) => {
  const { handleChange } = useContext(FormContext);
  return (
    <Form.Check
      style={{ paddingTop: "20px" }}
      type="checkbox"
      className="checkbox"
      name={name}
      label={label}
      value={value}
      checked={value}
      inline
      onChange={(e) =>
        handleChange({ target: { name: name, value: e.target.checked } })
      }
      required={required}
      disabled={readOnly}
      id={`inline-${controlId}`}
    />
  );
};

export default CheckboxComponent;
