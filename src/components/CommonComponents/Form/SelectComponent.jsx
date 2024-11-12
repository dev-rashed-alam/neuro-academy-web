import React, { useContext } from "react";
import "../../../assets/styles/Form.scss";
import { FormContext } from "../../Context/FormContext";
import Select from "react-select";
import { Form } from "react-bootstrap";
import {
  capitalizeFirstLetter,
  generateRandomNumber,
} from "../../Config/HelperUtils";

const customStyles = {
  menu: (base) => ({
    ...base,
    marginTop: "2px",
  }),
  option: (base) => ({
    // ...base,
    padding: "8px 12px",
    "&:hover": {
      cursor: "pointer !important",
      backgroundColor: "#e3e3e3 !important",
    },
  }),
};

const SelectComponent = ({
  label,
  name,
  required,
  type,
  placeHolder,
  controlId,
  readOnly,
  value,
  loading,
  options,
  disable,
  multiple,
  errors,
}) => {
  const { handleChange } = useContext(FormContext);

  const functionForHandleChange = (val) => {
    if (Array.isArray(val)) {
      let selectedValue = [];
      for (let item of val) {
        selectedValue.push(item);
      }
      handleChange({ target: { name: name, value: selectedValue } });
    } else if (val) {
      handleChange({ target: { name: name, value: val } });
    } else {
      handleChange({ target: { name: name, value: "" } });
    }
  };

  return (
    <Form.Group controlId={controlId} key={generateRandomNumber()}>
      <Form.Label>{label}</Form.Label>
      <Select
        styles={customStyles}
        options={options}
        defaultValue={value}
        placeholder={placeHolder}
        className={
          errors && Object.keys(errors).length > 0 && errors[name]
            ? "basic-single field-error"
            : "basic-single"
        }
        menuIsOpen={readOnly ? false : undefined}
        classNamePrefix="select"
        isDisabled={disable}
        isLoading={loading}
        isMulti={multiple}
        onChange={(val) => functionForHandleChange(val)}
        isClearable={true}
        isSearchable={true}
        name={name}
      />
      {errors && Object.keys(errors).length > 0 && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {capitalizeFirstLetter(errors[name])}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SelectComponent;
